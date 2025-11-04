import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import avatarTurnaround from "@/assets/avatar-360-turnaround.png";

function InlineAvatarModel() {
  const texture = useTexture(avatarTurnaround);
  return (
    <mesh rotation={[0, Math.PI / 2, 0]}>
      <cylinderGeometry args={[1.4, 1.4, 2.8, 32, 1, true]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent={false} />
    </mesh>
  );
}

function ResponsiveCamera({ setBasePosition, setAvatarScale }: { setBasePosition: (pos: [number, number, number]) => void; setAvatarScale: (s: number) => void }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isLandscape = aspect >= 1;

    const distance = isLandscape ? 12 : 13.5;
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();

    // Position avatar more to the left to show entire model
    const leftBias = isLandscape ? -1.8 : -2.2 - (1 / Math.max(0.5, aspect)) * 0.3;
    const clampedLeft = Math.max(-3.5, Math.min(-0.5, leftBias));
    const yOffset = isLandscape ? -0.15 : -0.2;
    setBasePosition([clampedLeft, yOffset, 0]);

    const scale = isLandscape ? 1 : Math.max(0.9, Math.min(1, aspect * 0.95));
    setAvatarScale(scale);
  }, [camera, size, setBasePosition, setAvatarScale]);

  return null;
}

export default function Avatar3D() {
  const [basePosition, setBasePosition] = useState<[number, number, number]>([-1.5, 0, 0]);
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [avatarScale, setAvatarScale] = useState<number>(1);
  const location = useLocation();

  // Derived final position = responsive base + user offset
  const avatarPosition: [number, number, number] = [
    basePosition[0] + offset[0],
    basePosition[1] + offset[1],
    basePosition[2]
  ];

  // Nudge avatar left on the home page to show full model
  useEffect(() => {
    if (location.pathname === "/") {
      setOffset(prev => [Math.min(prev[0] - 1.0, -0.5), prev[1]]);
    } else {
      // Reset when navigating away from home
      setOffset([0, 0]);
    }
  }, [location.pathname]);

  // Arrow-key movement with clamped bounds
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 0.15; // movement step per key press
      // Allowed bounds for final position (approx viewport-safe)
      const minX = -3.5;
      const maxX = 0.5;
      const minY = -0.6;
      const maxY = 0.4;

      let dx = 0;
      let dy = 0;
      if (e.key === "ArrowLeft") dx = -step;
      if (e.key === "ArrowRight") dx = step;
      if (e.key === "ArrowUp") dy = step;
      if (e.key === "ArrowDown") dy = -step;
      if (dx === 0 && dy === 0) return;

      e.preventDefault();

      setOffset(prev => {
        const nextX = Math.max(minX - basePosition[0], Math.min(maxX - basePosition[0], prev[0] + dx));
        const nextY = Math.max(minY - basePosition[1], Math.min(maxY - basePosition[1], prev[1] + dy));
        return [nextX, nextY];
      });
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown as EventListener);
  }, [basePosition]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
        <ResponsiveCamera setBasePosition={setBasePosition} setAvatarScale={setAvatarScale} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 3]} intensity={0.8} />
        <directionalLight position={[-5, 5, 3]} intensity={0.4} />
        <pointLight position={[0, 2, 2]} intensity={0.3} />

        <group position={avatarPosition} scale={[avatarScale, avatarScale, avatarScale]}>
          <InlineAvatarModel />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableRotate={true}
          autoRotate={false}
          minDistance={2}
          maxDistance={2}
        />
      </Canvas>
    </div>
  );
}
