import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import avatarTurnaround from "@/assets/avatar-360-turnaround.png";

function AvatarModel() {
  const texture = useTexture(avatarTurnaround);
  
  // Create a cylindrical model for 360-degree viewing
  return (
    <mesh rotation={[0, Math.PI, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 3.5, 32, 1, true]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        transparent={false}
      />
    </mesh>
  );
}

interface Avatar3DProps {
  className?: string;
}

export const Avatar3D = ({ className = "w-96 h-96" }: Avatar3DProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <AvatarModel />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
