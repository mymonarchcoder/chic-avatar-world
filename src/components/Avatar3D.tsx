import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import modelFront from "@/assets/model-front.png";
import modelSide from "@/assets/model-side.png";
import modelBack from "@/assets/model-back.png";
import modelSideAlt from "@/assets/model-side-alt.png";
import * as THREE from 'three';

function AvatarModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentTexture, setCurrentTexture] = useState(0);
  
  const textures = useTexture([modelFront, modelSide, modelBack, modelSideAlt]);
  
  useFrame(() => {
    if (meshRef.current) {
      const rotation = meshRef.current.rotation.y % (Math.PI * 2);
      const normalizedRotation = rotation < 0 ? rotation + Math.PI * 2 : rotation;
      
      // Determine which texture to show based on rotation angle
      if (normalizedRotation < Math.PI / 4 || normalizedRotation >= 7 * Math.PI / 4) {
        setCurrentTexture(0); // Front
      } else if (normalizedRotation >= Math.PI / 4 && normalizedRotation < 3 * Math.PI / 4) {
        setCurrentTexture(1); // Side
      } else if (normalizedRotation >= 3 * Math.PI / 4 && normalizedRotation < 5 * Math.PI / 4) {
        setCurrentTexture(2); // Back
      } else {
        setCurrentTexture(3); // Side alt
      }
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={textures[currentTexture]} transparent={true} />
    </mesh>
  );
}

interface Avatar3DProps {
  className?: string;
}

export const Avatar3D = ({ className = "w-96 h-96" }: Avatar3DProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ background: 'white' }}>
        <color attach="background" args={['white']} />
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
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
