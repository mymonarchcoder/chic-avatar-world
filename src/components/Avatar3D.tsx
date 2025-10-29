import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import modelFront from "@/assets/model-front-pose.png";
import modelSideRight from "@/assets/model-side-right.png";
import modelBack from "@/assets/model-back.png";
import modelSideLeft from "@/assets/model-side-left.png";

function AvatarModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentTexture, setCurrentTexture] = useState(0);
  
  const textures = useTexture([modelFront, modelSideRight, modelBack, modelSideLeft]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const rotation = meshRef.current.rotation.y % (Math.PI * 2);
    const normalizedRotation = rotation < 0 ? rotation + Math.PI * 2 : rotation;
    
    // Determine which texture to show based on rotation
    if (normalizedRotation < Math.PI / 4 || normalizedRotation >= 7 * Math.PI / 4) {
      setCurrentTexture(0); // Front
    } else if (normalizedRotation >= Math.PI / 4 && normalizedRotation < 3 * Math.PI / 4) {
      setCurrentTexture(1); // Right side
    } else if (normalizedRotation >= 3 * Math.PI / 4 && normalizedRotation < 5 * Math.PI / 4) {
      setCurrentTexture(2); // Back
    } else {
      setCurrentTexture(3); // Left side
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial 
        map={textures[currentTexture]} 
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
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ background: '#ffffff' }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={6}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};
