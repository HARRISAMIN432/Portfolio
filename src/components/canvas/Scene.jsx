import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import React, { useState, useRef, useEffect } from "react";

const Nebula = () => {
  const ref = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  });
  useFrame((s) => {
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.018;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={600}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#4f46e5"
        size={0.06}
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const HoloRings = () => {
  const r1 = useRef(),
    r2 = useRef(),
    r3 = useRef();
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    r1.current.rotation.x = t * 0.28;
    r1.current.rotation.z = t * 0.14;
    r2.current.rotation.y = t * 0.38;
    r2.current.rotation.x = t * 0.09;
    r3.current.rotation.z = -t * 0.22;
    r3.current.rotation.y = t * 0.18;
    const p = Math.sin(t * 0.8) * 0.05 + 1;
    r1.current.scale.setScalar(p);
    r3.current.scale.setScalar(1 / p);
  });
  return (
    <group>
      <mesh ref={r1} position={[3, 0.5, -2]}>
        <torusGeometry args={[1.2, 0.015, 8, 80]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.14}
          wireframe
        />
      </mesh>
      <mesh ref={r2} position={[-3.5, -0.5, -3]}>
        <torusGeometry args={[0.8, 0.01, 8, 60]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
      <mesh ref={r3} position={[0, 1.5, -5]}>
        <torusGeometry args={[2, 0.02, 8, 100]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.07}
          wireframe
        />
      </mesh>
    </group>
  );
};

const StarField = () => {
  const ref = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const [s1] = useState(() =>
    random.inSphere(new Float32Array(9000), { radius: 2.2 }),
  );
  const [s2] = useState(() =>
    random.inSphere(new Float32Array(3000), { radius: 3.5 }),
  );
  useEffect(() => {
    const fn = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  useFrame((s, delta) => {
    cur.current.x += (mouseRef.current.y * 0.4 - cur.current.x) * 0.04;
    cur.current.y += (mouseRef.current.x * 0.4 - cur.current.y) * 0.04;
    ref.current.rotation.x = cur.current.x - delta * 0.05;
    ref.current.rotation.y = cur.current.y - delta * 0.08;
  });
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 5]}>
      <Points positions={s1} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      <Points positions={s2} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#a78bfa"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
};

const Scene = () => (
  <div className="fixed inset-0 -z-10" style={{ background: "#02040f" }}>
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #02040f 100%)",
      }}
    />
    <div
      className="absolute top-0 left-0 right-0 h-[40vh] z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(180deg, rgba(59,130,246,0.07) 0%, transparent 100%)",
      }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-[30vh] z-10 pointer-events-none"
      style={{
        background: "linear-gradient(0deg, #02040f 0%, transparent 100%)",
      }}
    />
    <div
      className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
    <Canvas camera={{ position: [0, 0, 1.2], fov: 70 }}>
      <StarField />
      <Nebula />
      <HoloRings />
    </Canvas>
  </div>
);

export default Scene;
