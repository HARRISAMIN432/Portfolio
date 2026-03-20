import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  OrbitControls,
} from "@react-three/drei";

const AnimatedSphere = () => {
  const sphereRef = useRef();

  // Subtle rotation logic
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sphereRef.current.rotation.x = time * 0.2;
    sphereRef.current.rotation.y = time * 0.3;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
