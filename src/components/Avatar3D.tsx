import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import modelFront from "@/assets/model-front-real.png";
import modelSideRight from "@/assets/model-side-real.png";
import modelBack from "@/assets/model-back-real.png";
import modelSideLeft from "@/assets/model-side-left-real.png";

function AvatarModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  
  const textures = useTexture([modelFront, modelSideRight, modelBack, modelSideLeft]);
  
  useFrame(() => {
    if (meshRef.current) {
      const rotation = meshRef.current.rotation.y;
      const normalizedRotation = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      
      // Switch texture based on rotation angle
      // Front: 0-45° and 315-360°
      // Right Side: 45-135°
      // Back: 135-225°
      // Left Side: 225-315°
      if (normalizedRotation < Math.PI / 4 || normalizedRotation >= 7 * Math.PI / 4) {
        setCurrentTextureIndex(0); // Front
      } else if (normalizedRotation >= Math.PI / 4 && normalizedRotation < 3 * Math.PI / 4) {
        setCurrentTextureIndex(1); // Right side
      } else if (normalizedRotation >= 3 * Math.PI / 4 && normalizedRotation < 5 * Math.PI / 4) {
        setCurrentTextureIndex(2); // Back
      } else {
        setCurrentTextureIndex(3); // Left side
      }
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={textures[currentTextureIndex]} transparent={true} />
    </mesh>
  );
}

interface Avatar3DProps {
  className?: string;
}

export const Avatar3D = ({ className = "w-96 h-96" }: Avatar3DProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} />
        <Suspense fallback={null}>
          <AvatarModel />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={2.5}
            maxDistance={6}
            autoRotate={false}
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
