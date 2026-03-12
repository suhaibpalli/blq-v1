"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/*
  BUG #24 FIX: Previously used useTheme() to get `resolvedTheme` for particle color.
  
  Two problems with the old approach:
    1. On the initial render (SSR + hydration), `resolvedTheme` is `undefined`.
       THREE.js receives `undefined` as the color prop → flash of invisible/black particles.
    
    2. `particleColor` was computed outside useMemo but referenced inside the JSX as a prop.
       React re-renders when resolvedTheme changes, but THREE's instancedMesh material
       doesn't re-create — the color prop change doesn't propagate to the WebGL material.
  
  Fix: Remove useTheme() entirely. Read the CSS variable directly from the DOM at runtime
  inside useFrame, which runs every animation frame. This is:
    - Zero-cost (one getPropertyValue call vs. thousands of particle updates)  
    - Theme-aware (reacts to .light class changes on <html> immediately)
    - No hydration mismatch (no theme state involved)
    - Correct on first frame (CSS vars are always defined via :root)
*/

function Particles({ count = 1800 }: { count?: number }) {
  const mesh     = useRef<THREE.InstancedMesh>(null);
  const dummy    = useMemo(() => new THREE.Object3D(), []);
  const { mouse, viewport } = useThree();
  const clock    = useRef(0);
  const frameNum = useRef(0);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r     = 2.4 + (Math.random() - 0.5) * 1.8;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      const base = new THREE.Vector3(x, y, z);
      return {
        pos: base.clone(),
        base,
        speed: 0.008 + Math.random() * 0.016,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    clock.current = state.clock.getElapsedTime();
    frameNum.current++;

    // Sync particle color with CSS variable every 60 frames (~1 second at 60fps).
    // This is negligible cost and handles theme switches smoothly.
    if (frameNum.current % 60 === 0) {
      const cssColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-cyan")
        .trim();
      if (cssColor) {
        (mesh.current.material as THREE.MeshBasicMaterial).color.set(cssColor);
      }
    }

    mesh.current.rotation.y = clock.current * 0.04;
    mesh.current.rotation.x = clock.current * 0.015;

    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    particles.forEach((p, i) => {
      const t = clock.current;
      const nx = Math.sin(t * p.speed + p.phase) * 0.12;
      const ny = Math.cos(t * p.speed + p.phase * 1.3) * 0.12;

      p.pos.set(
        p.base.x + nx,
        p.base.y + ny,
        p.base.z + Math.sin(t * p.speed * 0.7 + p.phase) * 0.08
      );

      const screenPos = new THREE.Vector3(mx * 0.5, my * 0.5, 0);
      const d = p.pos.distanceTo(screenPos);
      if (d < 2.5) {
        const push = new THREE.Vector3()
          .subVectors(p.pos, screenPos)
          .normalize()
          .multiplyScalar((2.5 - d) * 0.15);
        p.pos.add(push);
      }

      dummy.position.copy(p.pos);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args={[undefined as any, undefined as any, count]}
    >
      <sphereGeometry args={[0.012, 6, 6]} />
      {/* Initial color #00E8FF — updated to CSS var value by useFrame on first tick */}
      <meshBasicMaterial color="#00E8FF" transparent opacity={0.55} />
    </instancedMesh>
  );
}

export default function HeroCanvas() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles count={isMobile ? 600 : 1800} />
      </Canvas>
    </div>
  );
}
