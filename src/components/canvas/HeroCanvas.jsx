import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Icosahedron,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";

// Outer wireframe shell — gives the "crystalline hologram" look
const WireShell = ({ scale, color, speed }) => {
  const ref = useRef();
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.7;
    ref.current.rotation.y = t * speed;
    ref.current.rotation.z = t * speed * 0.4;
  });
  return (
    <mesh ref={ref} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
};

// Inner chromatic ghost — red/cyan offset for aberration
const ChromaGhost = ({ offset, color }) => {
  const ref = useRef();
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.5 + offset) * 0.15;
    ref.current.position.y = Math.cos(t * 0.4 + offset) * 0.08;
  });
  return (
    <mesh ref={ref} scale={2.35}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial color={color} transparent opacity={0.04} />
    </mesh>
  );
};

// Energy ring orbiting the sphere
const OrbitRing = ({ radius, tilt, speed, color }) => {
  const ref = useRef();
  useFrame((s) => {
    ref.current.rotation.y = s.clock.getElapsedTime() * speed;
  });
  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

const MainSphere = () => {
  const ref = useRef();
  const glowRef = useRef();

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.2;
    if (glowRef.current) {
      const p = Math.sin(t * 1.2) * 0.08 + 1;
      glowRef.current.scale.setScalar(2.55 * p);
      glowRef.current.material.opacity = 0.025 + Math.sin(t * 2) * 0.008;
    }
  });

  return (
    <>
      {/* Pulsing bloom glow */}
      <mesh ref={glowRef} scale={2.55}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>

      {/* Chromatic aberration ghosts */}
      <ChromaGhost offset={0} color="#ef4444" />
      <ChromaGhost offset={Math.PI} color="#22d3ee" />

      {/* Wireframe shells */}
      <WireShell scale={2.7} color="#3b82f6" speed={0.18} />
      <WireShell scale={2.45} color="#818cf8" speed={-0.12} />

      {/* Orbiting rings */}
      <OrbitRing
        radius={3.0}
        tilt={Math.PI / 2.5}
        speed={0.5}
        color="#3b82f6"
      />
      <OrbitRing radius={3.4} tilt={Math.PI / 4} speed={-0.3} color="#818cf8" />
      <OrbitRing
        radius={2.7}
        tilt={Math.PI / 1.6}
        speed={0.7}
        color="#22d3ee"
      />

      {/* Core distortion sphere */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh ref={ref} scale={2.4}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#1d4ed8"
            distort={0.35}
            speed={1.5}
            roughness={0.0}
            metalness={1.0}
            envMapIntensity={3}
          />
        </mesh>
      </Float>

      {/* Inner hot core */}
      <mesh scale={1.1}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.08} />
      </mesh>
    </>
  );
};

const HeroCanvas = () => (
  <div className="absolute inset-0 z-0">
    <Canvas
      camera={{ position: [0, 0, 7], fov: 65 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
    >
      <ambientLight intensity={0.3} />
      <spotLight
        position={[15, 15, 10]}
        angle={0.2}
        penumbra={1}
        intensity={3}
        color="#3b82f6"
      />
      <spotLight
        position={[-15, -8, -10]}
        angle={0.3}
        penumbra={1}
        intensity={1.2}
        color="#818cf8"
      />
      <pointLight position={[0, 0, 6]} intensity={0.8} color="#ffffff" />
      <MainSphere />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  </div>
);

export default HeroCanvas;
