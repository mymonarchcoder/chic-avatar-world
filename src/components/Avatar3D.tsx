import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import avatarShowcase from "@/assets/avatar-showcase-clean.png";

function AvatarModel() {
  const texture = useTexture(avatarShowcase);
  
  return (
    <mesh>
      <planeGeometry args={[2, 3]} />
      <meshStandardMaterial map={texture} transparent={true} />
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
