"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function RetroComputer({ isHovered = false }) {
  const groupRef = useRef();
  const pointsMatRef = useRef();
  const linesMatRef = useRef();
  const screenMatRef = useRef();
  const scanlinesMatRef = useRef();

  const [lines, setLines] = useState(["", "", "", "", ""]);
  const [cursorVisible, setCursorVisible] = useState(true);

  // 1. Generate the 3D Dotted Casing Wireframe Geometry
  const { pointsFlatArray, linesFlatArray } = useMemo(() => {
    const points = [];
    const lines = [];

    const addEdge = (p1, p2, count = 12) => {
      // Add points along the edge
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        const x = p1[0] + (p2[0] - p1[0]) * t;
        const y = p1[1] + (p2[1] - p1[1]) * t;
        const z = p1[2] + (p2[2] - p1[2]) * t;
        points.push(x, y, z);
      }
      // Add line vertices
      lines.push(...p1, ...p2);
    };

    const v = {
      // Front face
      fBL: [-1.2, -1.3, 0.5],
      fBR: [1.2, -1.3, 0.5],
      fTR: [1.2, 1.3, 0.5],
      fTL: [-1.2, 1.3, 0.5],
      
      // Back face
      bBL: [-0.85, -1.0, -1.0],
      bBR: [0.85, -1.0, -1.0],
      bTR: [0.85, 0.9, -1.0],
      bTL: [-0.9, 0.9, -1.0],

      // Screen bezel cutout (inset)
      sBL: [-0.95, -0.4, 0.46],
      sBR: [0.95, -0.4, 0.46],
      sTR: [0.95, 1.05, 0.46],
      sTL: [-0.95, 1.05, 0.46],

      // Floppy slot
      fdTL: [-0.5, -0.85, 0.51],
      fdTR: [0.5, -0.85, 0.51],
      fdBR: [0.5, -0.92, 0.51],
      fdBL: [-0.5, -0.92, 0.51],
      
      // Base Stand
      pFL: [-0.45, -1.5, 0.35],
      pFR: [0.45, -1.5, 0.35],
      pBR: [0.4, -1.5, -0.45],
      pBL: [-0.4, -1.5, -0.45],
      
      // Stand mount points (on casing bottom)
      mFL: [-0.3, -1.3, 0.15],
      mFR: [0.3, -1.3, 0.15],
      mBR: [0.3, -1.3, -0.2],
      mBL: [-0.3, -1.3, -0.2]
    };

    // Front loop
    addEdge(v.fBL, v.fBR, 18);
    addEdge(v.fBR, v.fTR, 20);
    addEdge(v.fTR, v.fTL, 18);
    addEdge(v.fTL, v.fBL, 20);

    // Back loop
    addEdge(v.bBL, v.bBR, 14);
    addEdge(v.bBR, v.bTR, 16);
    addEdge(v.bTR, v.bTL, 14);
    addEdge(v.bTL, v.bBL, 16);

    // Front-to-back depth connections
    addEdge(v.fBL, v.bBL, 15);
    addEdge(v.fBR, v.bBR, 15);
    addEdge(v.fTR, v.bTR, 15);
    addEdge(v.fTL, v.bTL, 15);

    // Screen bezel loop
    addEdge(v.sBL, v.sBR, 15);
    addEdge(v.sBR, v.sTR, 16);
    addEdge(v.sTR, v.sTL, 15);
    addEdge(v.sTL, v.sBL, 16);

    // Front-to-screen bevel connectors
    addEdge([-0.95, -0.4, 0.5], v.sBL, 3);
    addEdge([0.95, -0.4, 0.5], v.sBR, 3);
    addEdge([0.95, 1.05, 0.5], v.sTR, 3);
    addEdge([-0.95, 1.05, 0.5], v.sTL, 3);

    // Floppy slot
    addEdge(v.fdTL, v.fdTR, 10);
    addEdge(v.fdTR, v.fdBR, 2);
    addEdge(v.fdBR, v.fdBL, 10);
    addEdge(v.fdBL, v.fdTL, 2);

    // Stand base
    addEdge(v.pFL, v.pFR, 8);
    addEdge(v.pFR, v.pBR, 8);
    addEdge(v.pBR, v.pBL, 8);
    addEdge(v.pBL, v.pFL, 8);

    // Mount stand connections
    addEdge(v.pFL, v.mFL, 4);
    addEdge(v.pFR, v.mFR, 4);
    addEdge(v.pBR, v.mBR, 4);
    addEdge(v.pBL, v.mBL, 4);

    // Top venting fins
    addEdge([-0.5, 0.9, -0.3], [-0.5, 0.9, -0.8], 5);
    addEdge([0.0, 0.9, -0.3], [0.0, 0.9, -0.8], 5);
    addEdge([0.5, 0.9, -0.3], [0.5, 0.9, -0.8], 5);

    return {
      pointsFlatArray: new Float32Array(points),
      linesFlatArray: new Float32Array(lines)
    };
  }, []);

  // 2. Generate Scanlines for the screen
  const scanlinesFlatArray = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 12; i++) {
      const y = -0.4 + (1.45 * (i / 11));
      lines.push(-0.95, y, 0.47, 0.95, y, 0.47);
    }
    return new Float32Array(lines);
  }, []);

  // 3. Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 550);
    return () => clearInterval(cursorInterval);
  }, []);

  // 4. Typewriter sequence
  useEffect(() => {
    if (!isHovered) {
      setLines(["", "", "", "", ""]);
      return;
    }

    let timer1, timer2, timer3, timer4, timer5;

    // Line 0: ADITYA_KAPOOR.OS
    const line0 = "ADITYA_KAPOOR.OS";
    let idx0 = 0;
    const typeLine0 = () => {
      if (idx0 <= line0.length) {
        setLines((prev) => {
          const next = [...prev];
          next[0] = line0.substring(0, idx0);
          return next;
        });
        idx0++;
        timer1 = setTimeout(typeLine0, 40);
      } else {
        timer2 = setTimeout(typeLine1, 100);
      }
    };

    // Line 1: STATUS: ONLINE
    const line1 = "STATUS: ONLINE";
    let idx1 = 0;
    const typeLine1 = () => {
      if (idx1 <= line1.length) {
        setLines((prev) => {
          const next = [...prev];
          next[1] = line1.substring(0, idx1);
          return next;
        });
        idx1++;
        timer2 = setTimeout(typeLine1, 40);
      } else {
        timer3 = setTimeout(typeLine2, 150);
      }
    };

    // Line 2: > BUILDING SYSTEMS...
    const line2 = "> BUILDING SYSTEMS...";
    let idx2 = 0;
    const typeLine2 = () => {
      if (idx2 <= line2.length) {
        setLines((prev) => {
          const next = [...prev];
          next[2] = line2.substring(0, idx2);
          return next;
        });
        idx2++;
        timer3 = setTimeout(typeLine2, 30);
      } else {
        timer4 = setTimeout(typeLine3, 150);
      }
    };

    // Line 3: > DESIGNING EXPERIENCES...
    const line3 = "> DESIGNING EXPERIENCES...";
    let idx3 = 0;
    const typeLine3 = () => {
      if (idx3 <= line3.length) {
        setLines((prev) => {
          const next = [...prev];
          next[3] = line3.substring(0, idx3);
          return next;
        });
        idx3++;
        timer4 = setTimeout(typeLine3, 30);
      } else {
        timer5 = setTimeout(typeLine4, 150);
      }
    };

    // Line 4: > TELLING STORIES...
    const line4 = "> TELLING STORIES...";
    let idx4 = 0;
    const typeLine4 = () => {
      if (idx4 <= line4.length) {
        setLines((prev) => {
          const next = [...prev];
          next[4] = line4.substring(0, idx4);
          return next;
        });
        idx4++;
        timer5 = setTimeout(typeLine4, 30);
      }
    };

    typeLine0();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isHovered]);

  // 5. High-Performance Frame Loop
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Lerp material values dynamically based on hover state (boot-up duration look & feel)
    const lerpSpeed = 0.08;
    const targetOpacity = isHovered ? 0.95 : 0.6;
    const targetSize = isHovered ? 0.065 : 0.045;
    const targetLineOpacity = isHovered ? 0.55 : 0.28;
    const targetScreenOpacity = isHovered ? 0.22 : 0.025;
    const targetScanlineOpacity = isHovered ? 0.18 : 0.025;

    if (pointsMatRef.current) {
      pointsMatRef.current.opacity = THREE.MathUtils.lerp(pointsMatRef.current.opacity, targetOpacity, lerpSpeed);
      pointsMatRef.current.size = THREE.MathUtils.lerp(pointsMatRef.current.size, targetSize, lerpSpeed);
    }
    if (linesMatRef.current) {
      linesMatRef.current.opacity = THREE.MathUtils.lerp(linesMatRef.current.opacity, targetLineOpacity, lerpSpeed);
    }
    if (screenMatRef.current) {
      screenMatRef.current.opacity = THREE.MathUtils.lerp(screenMatRef.current.opacity, targetScreenOpacity, lerpSpeed);
    }
    if (scanlinesMatRef.current) {
      scanlinesMatRef.current.opacity = THREE.MathUtils.lerp(scanlinesMatRef.current.opacity, targetScanlineOpacity, lerpSpeed);
    }

    // Gentle floating motion
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.15;
    
    // Slow idle rotation + subtle mouse reactivity
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const targetRotY = (isHovered ? 0.2 : 0.0) + pointerX * 0.25;
    const targetRotX = -0.05 + -pointerY * 0.18;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.3, 1.3, 1.3]}>
      {/* 3D Dotted Points mesh */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsFlatArray, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMatRef}
          color="#FFFFFF"
          size={0.045}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
        />
      </points>

      {/* 3D Casing Wireframe Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linesFlatArray, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={linesMatRef}
          color="#C2C1BD"
          transparent={true}
          opacity={0.28}
        />
      </lineSegments>

      {/* Screen Backdrop Mesh (Soft CRT Glow) */}
      <mesh position={[0, 0.325, 0.45]}>
        <planeGeometry args={[1.9, 1.45]} />
        <meshBasicMaterial
          ref={screenMatRef}
          color={isHovered ? "#E6F4EA" : "#1A1A1A"} // Warm ivory-green glow when active, transparent when off
          transparent={true}
          opacity={0.025}
        />
      </mesh>

      {/* Screen Scanlines Overlay */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[scanlinesFlatArray, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={scanlinesMatRef}
          color="#C2C1BD"
          transparent={true}
          opacity={0.025}
        />
      </lineSegments>

      {/* Interactive Screen Dynamic Light (Cast onto wireframe lines) */}
      {isHovered && (
        <pointLight
          position={[0, 0.325, 0.8]}
          color="#F4F3EF"
          intensity={0.4}
          distance={2.5}
          decay={2}
        />
      )}

      {/* Drei Text Component */}
      <Text
        position={[-0.85, 0.9, 0.475]}
        fontSize={0.072}
        color={isHovered ? "#34D399" : "#6B7280"} // Elegant terminal emerald green when powered on, dim gray when idle
        anchorX="left"
        anchorY="top"
        font="/ShareTechMono.woff"
        lineHeight={1.4}
        maxWidth={1.7}
      >
        {`${lines[0]}\n${lines[1]}\n${lines[2] ? '\n' + lines[2] : ''}${lines[3] ? '\n' + lines[3] : ''}${lines[4] ? '\n' + lines[4] : ''}${cursorVisible && isHovered ? '_' : ''}`}
      </Text>
    </group>
  );
}
