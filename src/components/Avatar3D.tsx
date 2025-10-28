import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import avatarFront from "@/assets/avatar-front-bright.png";

function AvatarModel() {
  const texture = useTexture(avatarFront);
  
  return (
    <mesh>
      <planeGeometry args={[3, 4.5]} />
      <meshStandardMaterial 
        map={texture} 
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
    <div className={className} style={{ background: 'white' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <AvatarModel />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={3}
            maxDistance={7}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
