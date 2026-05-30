"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";

// ── ECOSYSTEM NODE DATA ──
const ECOSYSTEM_NODES = [
  { id: "hexora", label: "HEXORA", type: "Venture", role: "Founder & CEO", desc: "Building modern websites, digital products, branding systems.", isHub: true, accent: "#6E8FB3" },
  { id: "evolve", label: "EVOLVE", type: "Venture", role: "Founder & CEO", desc: "Forming high-growth ideas, investing in developer pipelines, incubating platforms.", isHub: true, accent: "#5C7C9E" },
  { id: "pu-incent", label: "PU-iNCENT", type: "Ecosystem", role: "Chief Student Advisor", desc: "Managing collegiate startup incubation programs, cohort operations, founder advisory.", isHub: true, accent: "#223047" },
  { id: "projects", label: "PROJECTS", type: "Focus", role: "Innovation Lab", desc: "15+ custom dashboard systems, SaaS platforms, and spatial interactive portals.", accent: "#8EA8C3" },
  { id: "goals", label: "GOALS", type: "Focus", role: "Current Focus", desc: "Scale Hexora • Launch Evolve • Grow Founder Network", accent: "#6E8FB3" },
  { id: "research", label: "RESEARCH", type: "Focus", role: "Systems Thinking", desc: "Startups • AI • Systems Thinking • Innovation", accent: "#5C7C9E" },
  { id: "content", label: "CONTENT", type: "Focus", role: "Ideas Lab", desc: "Surgical essays drafted for active builders balancing code with operations.", accent: "#8EA8C3" },
  { id: "learning", label: "LEARNING", type: "Focus", role: "Growth Track", desc: "AI engineering pipelines, spatial design systems, high-performance architectures.", accent: "#6E8FB3" },
];

// ── CONNECTION PAIRS ──
const CONNECTIONS = [
  { from: "center", to: "hexora" },
  { from: "center", to: "evolve" },
  { from: "center", to: "pu-incent" },
  { from: "center", to: "projects" },
  { from: "center", to: "goals" },
  { from: "center", to: "research" },
  { from: "center", to: "content" },
  { from: "center", to: "learning" },
  // Cross-connections
  { from: "hexora", to: "projects" },
  { from: "evolve", to: "goals" },
  { from: "pu-incent", to: "learning" },
  { from: "research", to: "content" },
];

export default function EcosystemCubes() {
  const groupRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── CUBE DIMENSIONS ──
  const cubeSize = 2.2; // edge length — matches globe apparent size
  const halfSize = cubeSize / 2;

  // ── GENERATE DOTTED PARTICLES ON ALL 6 CUBE FACES (Fibonacci distribution per face) ──
  const particleCount = 480;
  const dotPositions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    const perFace = Math.floor(particleCount / 6);
    let idx = 0;

    // Helper: fill uniformly distributed dots on a face
    const fillFace = (axis, sign, count) => {
      const side = perFace > 0 ? Math.ceil(Math.sqrt(count)) : 0;
      let placed = 0;
      for (let row = 0; row < side && placed < count; row++) {
        for (let col = 0; col < side && placed < count; col++) {
          // Slight jitter for organic feel
          const u = ((col + 0.5) / side - 0.5) * cubeSize + (Math.random() - 0.5) * 0.12;
          const v = ((row + 0.5) / side - 0.5) * cubeSize + (Math.random() - 0.5) * 0.12;
          const w = sign * halfSize;

          if (axis === "x") { coords[idx] = w; coords[idx+1] = u; coords[idx+2] = v; }
          else if (axis === "y") { coords[idx] = u; coords[idx+1] = w; coords[idx+2] = v; }
          else { coords[idx] = u; coords[idx+1] = v; coords[idx+2] = w; }
          idx += 3;
          placed++;
        }
      }
    };

    fillFace("x", 1, perFace);
    fillFace("x", -1, perFace);
    fillFace("y", 1, perFace);
    fillFace("y", -1, perFace);
    fillFace("z", 1, perFace);
    fillFace("z", -1, particleCount - perFace * 5); // remainder

    return coords;
  }, [particleCount, cubeSize, halfSize]);

  // ── DISTRIBUTE 8 NODES ON CUBE SURFACE (Fibonacci on sphere, projected to cube shell) ──
  const nodesWithPositions = useMemo(() => {
    const N = ECOSYSTEM_NODES.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI * goldenRatio;
    const shellRadius = halfSize * 1.18; // just outside the cube

    return ECOSYSTEM_NODES.map((node, i) => {
      const t = (i + 0.5) / N;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      // Spherical → Cartesian
      let x = Math.sin(inclination) * Math.cos(azimuth);
      let y = Math.sin(inclination) * Math.sin(azimuth);
      let z = Math.cos(inclination);

      // Project onto cube shell: scale so the largest axis hits shellRadius
      const maxAbs = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
      const scale = shellRadius / maxAbs;
      x *= scale;
      y *= scale;
      z *= scale;

      return { ...node, position: [x, y, z] };
    });
  }, [halfSize]);

  // ── COMPUTE 3D CONNECTOR LINES ──
  const lineConnectors = useMemo(() => {
    return CONNECTIONS.map((conn) => {
      const fromNode = conn.from === "center" ? { id: "center" } : nodesWithPositions.find(n => n.id === conn.from);
      const toNode = nodesWithPositions.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return null;

      const start = conn.from === "center" ? [0, 0, 0] : fromNode.position;
      const end = toNode.position;

      return { fromId: conn.from, toId: conn.to, start, end };
    }).filter(Boolean);
  }, [nodesWithPositions]);

  // ── ANIMATION LOOP ──
  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow ambient rotation — matching globe behaviour
    const speed = hoveredNodeId ? 0.00015 : 0.001;
    groupRef.current.rotation.y += speed;

    // Pointer parallax tilt
    const targetX = state.pointer.x * 0.15;
    const targetY = -state.pointer.y * 0.15;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.035;
    groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.035;
  });

  return (
    <group ref={groupRef}>

      {/* ── 1. PRIMARY DOTTED PARTICLES ON CUBE FACES ── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFFFFF"
          size={0.04}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.85}
        />
      </points>

      {/* ── 2. SECONDARY DEPTH LAYER DOTS (slightly inset) ── */}
      <points scale={0.97}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D1D1D6"
          size={0.028}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.55}
        />
      </points>

      {/* ── 3. WIREFRAME CUBE SHELL (like the wireframe sphere on the globe) ── */}
      <mesh>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize, 6, 6, 6]} />
        <meshBasicMaterial
          color="#E2E2DF"
          wireframe={true}
          transparent={true}
          opacity={0.16}
        />
      </mesh>

      {/* ── 4. INNER AMBIENT GLOW ── */}
      <mesh>
        <boxGeometry args={[cubeSize * 0.7, cubeSize * 0.7, cubeSize * 0.7]} />
        <meshBasicMaterial
          color="#ECE9E2"
          transparent={true}
          opacity={0.04}
        />
      </mesh>

      {/* ── 5. CENTER NODE LABEL: ADITYA OS ── */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#6E8FB3" transparent opacity={0.1} />
        </mesh>
        <Html distanceFactor={10} center zIndexRange={[10, 20]}>
          <div className="bg-white/95 border border-charcoal/10 px-3 py-1.5 rounded-full shadow-none text-center pointer-events-none select-none min-w-[95px] backdrop-blur-[3px]">
            <div className="font-display font-extrabold text-[7.5px] tracking-wider text-charcoal leading-none">
              ADITYA OS
            </div>
            <div className="font-mono text-[5.5px] font-bold text-soft-gray uppercase tracking-widest mt-0.5">
              Founder Ecosystem
            </div>
          </div>
        </Html>
      </group>

      {/* ── 6. CONNECTING LINES ── */}
      {lineConnectors.map((line, idx) => {
        const isFromActive = hoveredNodeId === line.fromId;
        const isToActive = hoveredNodeId === line.toId;
        const isLineActive = isFromActive || isToActive;

        const lineColor = isLineActive ? "#6E8FB3" : "#8EA8C3";
        const lineOpacity = isLineActive ? 0.85 : (hoveredNodeId ? 0.04 : 0.16);

        return (
          <ThreeLine
            key={`${line.fromId}-${line.toId}-${idx}`}
            start={line.start}
            end={line.end}
            color={lineColor}
            opacity={lineOpacity}
            width={isLineActive ? 1.6 : 0.6}
          />
        );
      })}

      {/* ── 7. ECOSYSTEM NODES ON THE CUBE SURFACE ── */}
      {nodesWithPositions.map((node) => {
        const isNodeHovered = hoveredNodeId === node.id;
        const nodeAccent = node.accent || "#6E8FB3";
        const nodeOpacity = hoveredNodeId ? (isNodeHovered ? 1.0 : 0.2) : 0.85;
        const nodeScale = isNodeHovered ? 1.3 : 1.0;

        return (
          <group
            key={node.id}
            position={node.position}
            scale={nodeScale}
          >
            {/* Hoverable sphere point */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                setHoveredNodeId(node.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "default";
                setHoveredNodeId(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isMobile) {
                  setHoveredNodeId(hoveredNodeId === node.id ? null : node.id);
                }
              }}
            >
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshBasicMaterial
                color={isNodeHovered ? nodeAccent : "#8EA8C3"}
                transparent
                opacity={nodeOpacity}
              />
            </mesh>

            {/* Glow ring on hover */}
            {isNodeHovered && (
              <mesh scale={2.0}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                  color={nodeAccent}
                  transparent
                  opacity={0.22}
                />
              </mesh>
            )}

            {/* Spatial label tooltip on hover */}
            {isNodeHovered && (
              <Html distanceFactor={10} position={[0, 0.28, 0]} center zIndexRange={[30, 40]}>
                <div className="bg-white/95 backdrop-blur-md border border-charcoal/[0.08] px-2.5 py-2 rounded-lg shadow-premium-sm text-center pointer-events-none select-none min-w-[110px] max-w-[160px] border-l-[2.5px]"
                  style={{ borderLeftColor: nodeAccent }}
                >
                  <div className="font-display font-extrabold text-[7.5px] tracking-wider text-charcoal uppercase leading-none">
                    {node.label}
                  </div>
                  <div className="font-mono text-[5px] font-bold text-soft-gray uppercase tracking-widest mt-0.5">
                    {node.type}
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-charcoal/[0.05]">
                    <div className="text-[6px] font-mono font-bold uppercase tracking-widest leading-none mb-0.5"
                      style={{ color: nodeAccent }}
                    >
                      {node.role}
                    </div>
                    <p className="text-[6.5px] text-soft-gray leading-relaxed font-light">
                      {node.desc}
                    </p>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

// ── LINE HELPER ──
function ThreeLine({ start, end, color = "#8EA8C3", opacity = 0.2, width = 1 }) {
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
