"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, Sphere, OrbitControls, ContactShadows } from "@react-three/drei";

function Nucleus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);

    // Sync color with theme
    const style = getComputedStyle(document.documentElement);
    const cyan = style.getPropertyValue("--color-cyan").trim();
    if (cyan) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(cyan);
      mat.emissive.set(cyan);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial
        roughness={0.2}
        metalness={0.9}
        emissiveIntensity={0.6}
      />
    </Sphere>
  );
}

function Electron({ radius, speed, offset }: { radius: number; speed: number; offset: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const electronRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!meshRef.current || !electronRef.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    
    // Position on orbit
    electronRef.current.position.x = Math.sin(t) * radius;
    electronRef.current.position.z = Math.cos(t) * radius;

    // Pulse effect
    const scale = 0.12 + Math.sin(t * 3) * 0.03;
    electronRef.current.scale.setScalar(scale);

    // Theme sync
    const style = getComputedStyle(document.documentElement);
    const cyan = style.getPropertyValue("--color-cyan").trim();
    if (cyan) {
      (electronRef.current.material as THREE.MeshBasicMaterial).color.set(cyan);
      if (lightRef.current) lightRef.current.color.set(cyan);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh ref={electronRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0.9} />
        <pointLight ref={lightRef} intensity={0.8} distance={3} />
      </mesh>
    </group>
  );
}

function Orbital({ radius, rotation }: { radius: number; rotation: [number, number, number] }) {
  const lineRef = useRef<THREE.Line>(null);
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        p.push(new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius));
    }
    return p;
  }, [radius]);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  const line = useMemo(() => {
    const l = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5 }));
    return l;
  }, [lineGeometry]);

  useFrame(() => {
    const style = getComputedStyle(document.documentElement);
    const ink = style.getPropertyValue("--color-ink-2").trim() || "#55556A";
    (line.material as THREE.LineBasicMaterial).color.set(ink);
  });

  return <primitive object={line} rotation={rotation} />;
}

function Atom() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;

    // Sync particles
    const style = getComputedStyle(document.documentElement);
    const cyan = style.getPropertyValue("--color-cyan").trim();
    if (cyan && particlesRef.current) {
      (particlesRef.current.material as THREE.PointsMaterial).color.set(cyan);
    }
  });

  return (
    <group ref={groupRef}>
      <Nucleus />
      
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Orbital radius={2.5} rotation={[0, 0, 0]} />
        <Electron radius={2.5} speed={1.2} offset={0} />
      </group>

      <group rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <Orbital radius={2.8} rotation={[0, 0, 0]} />
        <Electron radius={2.8} speed={0.8} offset={Math.PI} />
      </group>

      <group rotation={[0, -Math.PI / 3, Math.PI / 4]}>
        <Orbital radius={3.2} rotation={[0, 0, 0]} />
        <Electron radius={3.2} speed={1.5} offset={Math.PI / 2} />
      </group>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <points ref={particlesRef}>
          <sphereGeometry args={[5, 32, 32]} />
          <pointsMaterial size={0.035} transparent opacity={0.6} sizeAttenuation />
        </points>
      </Float>
    </group>
  );
}

export default function AtomScene() {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.2} />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={2.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <Atom />
        <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={20} blur={2} far={4.5} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1}
          makeDefault 
        />
      </Canvas>
    </div>
  );
}
