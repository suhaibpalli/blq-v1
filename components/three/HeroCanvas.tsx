"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate initial random positions on a sphere/mesh
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push({
        position: new THREE.Vector3(x, y, z),
        basePosition: new THREE.Vector3(x, y, z),
        speed: 0.01 + Math.random() * 0.02,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate slow
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.02;

    particles.forEach((particle, i) => {
      // Very subtle mouse interaction
      const target = particle.basePosition.clone();
      
      // Affect particles based on mouse distance
      const mouseVec = new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      );
      
      const distance = mouseVec.distanceTo(mesh.current!.position.clone().add(particle.basePosition));
      
      if (distance < 3) {
        target.add(mouseVec.sub(particle.basePosition).normalize().multiplyScalar(-0.5));
      }

      // Add noise motion
      target.x += Math.sin(time * particle.speed + i) * 0.1;
      target.y += Math.cos(time * particle.speed + i) * 0.1;

      // Lerp position
      particle.position.lerp(target, 0.05);

      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <instancedMesh ref={mesh} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Particles count={typeof window !== "undefined" && window.innerWidth < 768 ? 500 : 2000} />
      </Canvas>
    </div>
  );
}
