"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// SURROUNDING NODES
const SURROUNDING_NODES = [
  // Primary Venture Hubs
  { id: "hexora", label: "HEXORA", type: "Venture", x: 0.45, y: -0.25, desc: "Digital solutions company focused on branding, web systems, automation, and startup growth.", isHub: true, accent: "#6E8FB3" },
  { id: "evolve", label: "EVOLVE", type: "Venture", x: -0.50, y: 0.0, desc: "Founder-led initiative focused on innovation, growth, and future digital ventures.", isHub: true, accent: "#D9C7A2" },
  { id: "pu-incent", label: "PU-iNCENT", type: "Ecosystem", x: 0.45, y: 0.25, desc: "University startup incubation ecosystem empowering student founders and innovators.", isHub: true, accent: "#223047" },
  
  // Secondary Focus Nodes
  { id: "startup-ecosystems", label: "Startup Ecosystems", type: "Focus", x: -0.30, y: -0.68, desc: "Fostering regional entrepreneurship and scaling incubator models.", accent: "#8A8A8A" },
  { id: "digital-products", label: "Digital Products", type: "Focus", x: 0.80, y: -0.05, desc: "Designing and engineering robust SaaS, dashboards, and complex web systems.", accent: "#6E8FB3" },
  { id: "modern-websites", label: "Modern Websites", type: "Focus", x: -0.45, y: 0.65, desc: "Creating high-fidelity, motion-rich editorial web experiences.", accent: "#D9C7A2" },
  { id: "brand-systems", label: "Brand Systems", type: "Focus", x: 0.82, y: -0.52, desc: "Crafting minimalist corporate identities, type systems, and digital guidelines.", accent: "#6E8FB3" },
  { id: "innovation-programs", label: "Innovation Programs", type: "Focus", x: 0.58, y: 0.65, desc: "Designing accelerator tracks, hackathons, and cohort operations.", accent: "#223047" },
  { id: "student-communities", label: "Student Communities", type: "Focus", x: -0.78, y: -0.42, desc: "Mobilizing tech clubs, developers, and collegiate innovation pipelines.", accent: "#8A8A8A" },
  { id: "founder-mentorship", label: "Founder Mentorship", type: "Focus", x: -0.80, y: 0.35, desc: "Advising early-stage founders on product-market fit and tech architecture.", accent: "#D9C7A2" },
  { id: "creative-collabs", label: "Creative Collaborations", type: "Focus", x: 0.05, y: 0.72, desc: "Engaging in cross-disciplinary projects at the intersection of design and tech.", accent: "#8A8A8A" },
  { id: "innovation-events", label: "Innovation Events", type: "Focus", x: 0.15, y: -0.70, desc: "Organizing and producing tech conferences and startup summits.", accent: "#223047" }
];

const CONNECTIONS = [
  // Root to Primary Hubs
  { from: "center", to: "hexora" },
  { from: "center", to: "evolve" },
  { from: "center", to: "pu-incent" },
  
  // Hexora Connections
  { from: "hexora", to: "digital-products" },
  { from: "hexora", to: "modern-websites" },
  { from: "hexora", to: "brand-systems" },
  
  // Evolve Connections
  { from: "evolve", to: "startup-ecosystems" },
  { from: "evolve", to: "founder-mentorship" },
  { from: "evolve", to: "creative-collabs" },
  
  // PU-iNCENT Connections
  { from: "pu-incent", to: "innovation-programs" },
  { from: "pu-incent", to: "student-communities" },
  { from: "pu-incent", to: "innovation-events" },

  // Cross-Connections
  { from: "startup-ecosystems", to: "innovation-programs" },
  { from: "founder-mentorship", to: "student-communities" },
  { from: "creative-collabs", to: "modern-websites" },
  { from: "brand-systems", to: "innovation-events" }
];

export default function EcosystemGlobe({ onHoverNode, onClickNode, activeNodeId }) {
  const groupRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Distribute 12 nodes evenly on a sphere shell via Fibonacci lattice
  const sphereRadius = 2.85;
  const nodesWithPositions = useMemo(() => {
    const N = SURROUNDING_NODES.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI * goldenRatio;

    return SURROUNDING_NODES.map((node, i) => {
      // Stagger latitude index to avoid pole clustering
      const t = (i + 0.5) / N;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = Math.sin(inclination) * Math.cos(azimuth) * sphereRadius;
      const y = Math.sin(inclination) * Math.sin(azimuth) * sphereRadius;
      const z = Math.cos(inclination) * sphereRadius;

      return {
        ...node,
        position: [x, y, z]
      };
    });
  }, []);

  // Compute 3D connector lines
  const lineConnectors = useMemo(() => {
    return CONNECTIONS.map((conn) => {
      const fromNode = conn.from === "center" ? { id: "center" } : nodesWithPositions.find(n => n.id === conn.from);
      const toNode = nodesWithPositions.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return null;

      const start = conn.from === "center" ? [0, 0, 0] : fromNode.position;
      const end = toNode.position;

      return {
        fromId: conn.from,
        toId: conn.to,
        start,
        end
      };
    }).filter(Boolean);
  }, [nodesWithPositions]);

  // Dotted background particles (750 Fibonacci points) - identical to homepage globe
  const bgParticleCount = 450;
  const bgParticlePositions = useMemo(() => {
    const coords = new Float32Array(bgParticleCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI * goldenRatio;

    for (let i = 0; i < bgParticleCount; i++) {
      const t = i / bgParticleCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = Math.sin(inclination) * Math.cos(azimuth) * sphereRadius;
      const y = Math.sin(inclination) * Math.sin(azimuth) * sphereRadius;
      const z = Math.cos(inclination) * sphereRadius;

      coords[i * 3] = x;
      coords[i * 3 + 1] = y;
      coords[i * 3 + 2] = z;
    }
    return coords;
  }, [bgParticleCount]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Default rotation is slow, slows down even more when a node is hovered or active
    const activeOrHovered = hoveredNodeId || activeNodeId;
    const speed = activeOrHovered ? 0.00015 : 0.001;
    groupRef.current.rotation.y += speed;

    // Subtle pointer parallax tilt responsiveness
    const targetX = state.pointer.x * 0.15;
    const targetY = -state.pointer.y * 0.15;

    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.035;
    groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.035;
  });

  const activeOrHoveredId = hoveredNodeId || activeNodeId;

  return (
    <group ref={groupRef}>
      {/* 1. Subtle Dotted network backdrop to establish physical sphere texture */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bgParticlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D1D1D6"
          size={0.032}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.35}
        />
      </points>

      {/* 2. Dotted Coordinate Shell Wireframe - very light and crisp */}
      <mesh scale={0.998}>
        <sphereGeometry args={[sphereRadius, 18, 18]} />
        <meshBasicMaterial
          color="#E2E2DF"
          wireframe={true}
          transparent={true}
          opacity={0.12}
        />
      </mesh>

      {/* 3. Central Identity Node - ADITYA KAPOOR (Root Node at [0,0,0]) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial
            color="#223047"
            transparent
            opacity={0.06}
          />
        </mesh>
        <Html distanceFactor={8} center zIndexRange={[10, 20]}>
          <div className="bg-white/95 border border-charcoal/10 px-4 py-2 rounded-full shadow-premium-md text-center pointer-events-none select-none min-w-[125px] backdrop-blur-[3px]">
            <div className="font-display font-extrabold text-[9px] tracking-wider text-charcoal leading-none">
              ADITYA KAPOOR
            </div>
            <div className="font-mono text-[6.5px] font-bold text-soft-gray uppercase tracking-widest mt-1">
              Founder Ecosystem
            </div>
          </div>
        </Html>
      </group>

      {/* 4. Elegant 3D Connecting Lines */}
      {lineConnectors.map((line, idx) => {
        const isFromActive = activeOrHoveredId === line.fromId;
        const isToActive = activeOrHoveredId === line.toId;
        const isLineActive = isFromActive || isToActive;

        // slate blue highlight on active connection
        const lineColor = isLineActive ? "#6E8FB3" : "#E2E2DF";
        const lineOpacity = isLineActive ? 0.8 : (activeOrHoveredId ? 0.04 : 0.22);
        const lineWidth = isLineActive ? 1.5 : 0.6;

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

      {/* 5. Orbiting Interactive Focus Nodes */}
      {nodesWithPositions.map((node) => {
        const isNodeHovered = hoveredNodeId === node.id;
        const isNodeSelected = activeNodeId === node.id;
        const isActive = isNodeHovered || isNodeSelected;

        // Accent coloring
        const nodeAccent = node.accent || "#6E8FB3";
        const nodeOpacity = activeOrHoveredId ? (isActive ? 1.0 : 0.2) : 0.85;
        const nodeScale = isActive ? 1.45 : 1.0;

        return (
          <group 
            key={node.id} 
            position={node.position}
            scale={nodeScale}
          >
            {/* Draggable/Hoverable point mesh */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                setHoveredNodeId(node.id);
                onHoverNode?.(node.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "default";
                setHoveredNodeId(null);
                onHoverNode?.(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                onClickNode?.(node.id);
              }}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial 
                color={isActive ? nodeAccent : "#8A8A8A"}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>

            {/* Glowing translucent overlay outer ring when active */}
            {isActive && (
              <mesh scale={2.2}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial
                  color={nodeAccent}
                  transparent
                  opacity={0.22}
                />
              </mesh>
            )}

            {/* Spatial text label hovering directly above the node when hovered */}
            {isNodeHovered && (
              <Html distanceFactor={8} position={[0, 0.25, 0]} center zIndexRange={[30, 40]}>
                <div className="bg-charcoal px-2.5 py-1 rounded-[6px] shadow-premium-lg text-[9px] font-mono tracking-widest uppercase text-white whitespace-nowrap pointer-events-none select-none">
                  {node.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Lightweight Native Three.js line helper to avoid heavy custom shader imports
function ThreeLine({ start, end, color = "#E2E2DF", opacity = 0.2, width = 1 }) {
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
