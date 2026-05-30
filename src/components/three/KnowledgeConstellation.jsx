"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// 12 Idea Nodes with their unique soft-accent palettes
const KNOWLEDGE_NODES = [
  { id: "startups", label: "Startups", position: [-1.8, 1.1, 0.2], accent: "#6E8FB3" },
  { id: "branding", label: "Branding", position: [0.6, 1.6, -0.6], accent: "#8EA8C3" },
  { id: "systems", label: "Systems", position: [-0.6, 0.3, 1.1], accent: "#223047" },
  { id: "innovation", label: "Innovation", position: [1.7, 1.0, 0.3], accent: "#6E8FB3" },
  { id: "ai", label: "AI", position: [0.8, -0.7, 1.2], accent: "#223047" },
  { id: "product-design", label: "Product Design", position: [-0.2, 1.1, -0.7], accent: "#8EA8C3" },
  { id: "growth", label: "Growth", position: [-1.9, -0.8, -0.3], accent: "#6E8FB3" },
  { id: "leadership", label: "Leadership", position: [-1.1, -1.5, 0.6], accent: "#223047" },
  { id: "technology", label: "Technology", position: [1.6, -1.2, -0.6], accent: "#6E8FB3" },
  { id: "web-experiences", label: "Web Experiences", position: [-0.4, -0.4, -1.2], accent: "#8EA8C3" },
  { id: "entrepreneurship", label: "Entrepreneurship", position: [-1.2, 0.3, -0.8], accent: "#223047" },
  { id: "strategy", label: "Strategy", position: [0.6, 0.3, 0.6], accent: "#6E8FB3" }
];

// Elegant relationships defining the constellation
const RELATIONSHIPS = [
  { from: "startups", to: "entrepreneurship" },
  { from: "startups", to: "strategy" },
  { from: "startups", to: "growth" },
  { from: "branding", to: "product-design" },
  { from: "branding", to: "web-experiences" },
  { from: "systems", to: "strategy" },
  { from: "systems", to: "technology" },
  { from: "innovation", to: "ai" },
  { from: "innovation", to: "technology" },
  { from: "innovation", to: "startups" },
  { from: "ai", to: "technology" },
  { from: "ai", to: "systems" },
  { from: "product-design", to: "web-experiences" },
  { from: "growth", to: "strategy" },
  { from: "growth", to: "entrepreneurship" },
  { from: "leadership", to: "entrepreneurship" },
  { from: "leadership", to: "strategy" },
  { from: "web-experiences", to: "technology" }
];

export default function KnowledgeConstellation({ onNodeClick }) {
  const groupRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Compute live lines based on state
  const lines = useMemo(() => {
    return RELATIONSHIPS.map((rel) => {
      const fromNode = KNOWLEDGE_NODES.find((n) => n.id === rel.from);
      const toNode = KNOWLEDGE_NODES.find((n) => n.id === rel.to);
      if (!fromNode || !toNode) return null;
      return {
        fromId: rel.from,
        toId: rel.to,
        start: fromNode.position,
        end: toNode.position
      };
    }).filter(Boolean);
  }, []);

  // slow floating group movement & mouse parallax
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // calm organic drifts
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.12;
    groupRef.current.position.x = Math.cos(t * 0.3) * 0.08;

    // parallax pointer tilt
    const targetX = state.pointer.x * 0.2;
    const targetY = -state.pointer.y * 0.2;

    groupRef.current.rotation.y += 0.0008; // extremely slow automatic spin
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Connections */}
      {lines.map((line, idx) => {
        const isFromActive = hoveredNodeId === line.fromId;
        const isToActive = hoveredNodeId === line.toId;
        const isActive = isFromActive || isToActive;

        // Colors and widths illuminate on hover
        const lineColor = isActive ? "#6E8FB3" : "#E2E8F0";
        const lineOpacity = isActive ? 0.8 : (hoveredNodeId ? 0.08 : 0.25);
        const lineWidth = isActive ? 1.5 : 0.6;

        return (
          <ThreeLine
            key={`${line.fromId}-${line.toId}-${idx}`}
            start={line.start}
            end={line.end}
            color={lineColor}
            opacity={lineOpacity}
            width={lineWidth}
          />
        );
      })}

      {/* Floating Knowledge Nodes */}
      {KNOWLEDGE_NODES.map((node) => {
        const isNodeHovered = hoveredNodeId === node.id;
        const isRelated = hoveredNodeId && RELATIONSHIPS.some(
          (rel) => (rel.from === node.id && rel.to === hoveredNodeId) || 
                   (rel.to === node.id && rel.from === hoveredNodeId)
        );

        return (
          <ConstellationNode
            key={node.id}
            node={node}
            isHovered={isNodeHovered}
            isRelated={isRelated}
            activeNodeId={hoveredNodeId}
            onHover={setHoveredNodeId}
            onClick={onNodeClick}
            isMobile={isMobile}
          />
        );
      })}

      {/* Small floating status label */}
      <Html distanceFactor={8} position={[0, -2.1, 0]} center>
        <div className="text-[8px] font-mono tracking-[0.25em] text-soft-gray/50 uppercase select-none whitespace-nowrap transition-opacity duration-300">
          IDEAS CONNECT HERE
        </div>
      </Html>
    </group>
  );
}

// Interactive Node
function ConstellationNode({ node, isHovered, isRelated, activeNodeId, onHover, onClick, isMobile }) {
  const meshRef = useRef(null);
  const ringRef = useRef(null);
  const [localHovered, setLocalHovered] = useState(false);

  const accentColor = node.accent || "#6E8FB3";

  // determine dynamic scales and opacities smoothly
  const targetScale = isHovered ? 1.5 : (isRelated ? 1.2 : (activeNodeId ? 0.75 : 1.0));
  const targetOpacity = isHovered || isRelated ? 1.0 : (activeNodeId ? 0.25 : 0.75);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth state lerp interpolations
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.008;
      const pulse = 1.9 + Math.sin(t * 3) * 0.2;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          setLocalHovered(true);
          onHover?.(node.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "default";
          setLocalHovered(false);
          onHover?.(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(node.label);
        }}
      >
        <sphereGeometry args={[isMobile ? 0.07 : 0.08, 16, 16]} />
        <meshBasicMaterial
          color={isHovered || isRelated ? accentColor : "#A0AEC0"}
          transparent
          opacity={targetOpacity}
        />

        {/* Highlight Outer ring */}
        {isHovered && (
          <mesh ref={ringRef}>
            <ringGeometry args={[0.11, 0.13, 16]} />
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Hover Label */}
        {localHovered && (
          <Html distanceFactor={8} position={[0, 0.24, 0]} center zIndexRange={[30, 40]}>
            <div className="bg-charcoal px-2.5 py-1 rounded-[6px] shadow-premium-lg text-[9px] font-mono tracking-widest uppercase text-white whitespace-nowrap pointer-events-none select-none">
              {node.label}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

// native line helper to keep SSR and bundles light
function ThreeLine({ start, end, color = "#E2E8F0", opacity = 0.25, width = 1 }) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        attach="material" 
        color={color} 
        transparent 
        opacity={opacity} 
        linewidth={width}
      />
    </line>
  );
}
