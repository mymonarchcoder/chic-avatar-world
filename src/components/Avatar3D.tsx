import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import avatarModel from "@/assets/avatar-model.png";

function AvatarModel() {
  const texture = useTexture(avatarModel);
  
  // Create a plane for the avatar model
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        transparent={true}
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
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'hsl(var(--background))' }}
      >
        <color attach="background" args={['hsl(var(--background))']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={7}
          autoRotate={false}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};
