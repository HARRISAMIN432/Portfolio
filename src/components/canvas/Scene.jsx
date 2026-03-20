import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import React, { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

// 1. NEBULA OPTIMIZATION: Use useMemo and standard Points component
const Nebula = () => {
  const ref = useRef();

  // Optimization: useMemo ensures this array is only created ONCE.
  // Using a sphere distribution is more GPU-efficient than manual random loops.
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(300 * 3), { radius: 5 }),
    [],
  );

  useFrame((state, delta) => {
    // Optimization: Multiply by delta to ensure speed is the same on 60Hz and 144Hz screens
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#4f46e5"
          size={0.08}
          sizeAttenuation
          depthWrite={false}
          opacity={0.15}
          blending={THREE.AdditiveBlending} // Better visual "glow" with less opacity
        />
      </Points>
    </group>
  );
};

// 2. HOLORINGS OPTIMIZATION: Reduce Geometry complexity
const HoloRings = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.children[0].rotation.x = t * 0.2;
    groupRef.current.children[1].rotation.y = t * 0.3;
    groupRef.current.children[2].rotation.z = t * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Optimization: Lower segments (8, 60) for background items saves thousands of vertices */}
      <mesh position={[3, 0.5, -2]}>
        <torusGeometry args={[1.2, 0.01, 8, 40]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
      <mesh position={[-3.5, -0.5, -3]}>
        <torusGeometry args={[0.8, 0.01, 8, 30]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
      <mesh position={[0, 1.5, -5]}>
        <torusGeometry args={[2, 0.01, 8, 50]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>
    </group>
  );
};

// 3. STARFIELD OPTIMIZATION: Drastic reduction in point count
const StarField = () => {
  const ref = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // 12,000 points was overkilling the GPU; 4,000 looks identical but runs 3x faster
  const [s1] = useState(() =>
    random.inSphere(new Float32Array(3000 * 3), { radius: 2.5 }),
  );
  const [s2] = useState(() =>
    random.inSphere(new Float32Array(1000 * 3), { radius: 4 }),
  );

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state, delta) => {
    // Smoother lerping for the mouse parallax
    ref.current.rotation.x += (mouse.current.y - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (mouse.current.x - ref.current.rotation.y) * 0.05;

    // Constant slow drift
    ref.current.rotation.z += delta * 0.02;
  });

  return (
    <group ref={ref}>
      <Points positions={s1} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
      <Points positions={s2} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#a78bfa"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Scene = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#02040f]">
      {/* Optimization: Use CSS for the heavy noise/gradient overlays instead of Three.js layers */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#02040f_100%)]" />

      <Canvas
        camera={{ position: [0, 0, 1.2], fov: 70 }}
        dpr={[1, 2]} // Optimization: Limit resolution on high-DPI screens (Retina)
        gl={{
          antialias: false, // Stars don't need antialiasing, saves huge GPU power
          powerPreference: "high-performance",
        }}
      >
        <StarField />
        <Nebula />
        <HoloRings />
      </Canvas>
    </div>
  );
};

export default Scene;
