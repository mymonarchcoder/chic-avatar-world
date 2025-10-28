import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import avatarTurnaround from "@/assets/avatar-360-turnaround.png";

function AvatarModel() {
  const texture = useTexture(avatarTurnaround);
  
  // Create a cylindrical model for 360-degree viewing
  // Starting rotation set to face front (0 degrees)
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <cylinderGeometry args={[1.2, 1.2, 4, 64, 1, true]} />
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
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: 'white' }}
      >
        <color attach="background" args={['white']} />
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
