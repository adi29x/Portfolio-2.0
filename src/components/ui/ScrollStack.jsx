"use client";
import React, { useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div 
    className={`scroll-stack-card ${itemClassName}`.trim()}
    style={style}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const cardOffsetsRef = useRef([]);
  const endElementOffsetRef = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: typeof window !== 'undefined' ? window.scrollY : 0,
        containerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
        scrollContainer: typeof document !== 'undefined' ? document.documentElement : null
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller || (typeof document !== 'undefined' ? document.documentElement : null)
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (!element) return 0;
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + (typeof window !== 'undefined' ? window.scrollY : 0);
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const measureOffsets = useCallback(() => {
    if (!cardsRef.current.length) return;

    // Save current active transforms and filters
    const savedTransforms = cardsRef.current.map(card => card ? card.style.transform : '');
    const savedFilters = cardsRef.current.map(card => card ? card.style.filter : '');

    // Reset styles temporarily to read static, clean layout positions
    cardsRef.current.forEach(card => {
      if (card) {
        card.style.transform = 'none';
        card.style.filter = 'none';
      }
    });

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end');
    
    // Batch read to minimize forced layout recalculations (eliminates layout thrashing)
    const offsets = cardsRef.current.map(card => {
      if (!card) return 0;
      return getElementOffset(card);
    });

    const endOffset = endElement ? getElementOffset(endElement) : 0;

    // Restore saved styles
    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.transform = savedTransforms[i];
        card.style.filter = savedFilters[i];
      }
    });

    cardOffsetsRef.current = offsets;
    endElementOffsetRef.current = endOffset;
  }, [getElementOffset]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    // Ensure offsets are initialized
    if (!cardOffsetsRef.current.length || cardOffsetsRef.current.length !== cardsRef.current.length) {
      measureOffsets();
    }

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementOffsetRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] || 0;

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardOffsetsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    measureOffsets
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupThrottledScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    let scheduled = false;
    const handleThrottledScroll = () => {
      if (!scheduled) {
        scheduled = true;
        animationFrameRef.current = requestAnimationFrame(() => {
          updateCardTransforms();
          scheduled = false;
        });
      }
    };

    const handleResize = () => {
      measureOffsets();
      handleThrottledScroll();
    };

    window.addEventListener('scroll', handleThrottledScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Run an initial sync
    handleResize();

    return {
      destroy: () => {
        window.removeEventListener('scroll', handleThrottledScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [updateCardTransforms, measureOffsets]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      return setupThrottledScroll();
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        wheelMultiplier: 1,
        touchInertiaMultiplier: 35,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertia: 0.6
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll, setupThrottledScroll]);

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const cards = Array.from(
      scrollerRef.current ? scrollerRef.current.querySelectorAll('.scroll-stack-card') : []
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.zIndex = i + 1;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    const lenisInstance = setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      } else if (lenisInstance && typeof lenisInstance.destroy === 'function') {
        lenisInstance.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  return (
    <div 
      className={`scroll-stack-scroller ${useWindowScroll ? 'use-window-scroll' : ''} ${className}`.trim()} 
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
