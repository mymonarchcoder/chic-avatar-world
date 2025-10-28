import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import avatarRealistic from "@/assets/avatar-realistic-front.png";

function AvatarModel() {
  const texture = useTexture(avatarRealistic);
  
  // Create a plane that always faces the camera
  return (
    <mesh rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 3.5]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        side={THREE.DoubleSide}
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
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'white' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={6}
          enableRotate={true}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};
