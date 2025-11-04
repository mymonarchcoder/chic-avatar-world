import React, { useState, useEffect } from "react";
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

function ResponsiveCamera({ setAvatarPosition, setAvatarScale }: { setAvatarPosition: (pos: [number, number, number]) => void; setAvatarScale: (s: number) => void }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isLandscape = aspect >= 1;

    const distance = isLandscape ? 12 : 13.5;
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();

    const leftBias = isLandscape ? -4.2 : -5.8 - (1 / Math.max(0.5, aspect)) * 0.6;
    const clampedLeft = Math.max(-6.5, Math.min(-3.5, leftBias));
    const yOffset = isLandscape ? -0.15 : -0.2;
    setAvatarPosition([clampedLeft, yOffset, 0]);

    const scale = isLandscape ? 1 : Math.max(0.9, Math.min(1, aspect * 0.95));
    setAvatarScale(scale);
  }, [camera, size, setAvatarPosition, setAvatarScale]);

  return null;
}

export default function Avatar3D() {
  const [avatarPosition, setAvatarPosition] = useState<[number, number, number]>([-5.5, 0, 0]);
  const [avatarScale, setAvatarScale] = useState<number>(1);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
        <ResponsiveCamera setAvatarPosition={setAvatarPosition} setAvatarScale={setAvatarScale} />

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
