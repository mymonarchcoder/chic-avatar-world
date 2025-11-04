import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera } from "lucide-react";
import * as THREE from "three";

const ParticleBody = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Create human-like body shape with particles
  const particleCount = 15000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Generate body shape particles
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 0.3 + 0.2;
    
    // Create body segments (head, torso, arms, legs)
    const segment = Math.random();
    let x, y, z;
    
    if (segment < 0.15) {
      // Head
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 0.25;
      x = r * Math.sin(phi) * Math.cos(theta);
      y = 1.8 + r * Math.cos(phi);
      z = r * Math.sin(phi) * Math.sin(theta);
    } else if (segment < 0.5) {
      // Torso
      x = (Math.random() - 0.5) * 0.6;
      y = Math.random() * 1.2 + 0.3;
      z = (Math.random() - 0.5) * 0.4;
    } else if (segment < 0.7) {
      // Arms
      const side = Math.random() < 0.5 ? -1 : 1;
      x = side * (Math.random() * 0.5 + 0.3);
      y = Math.random() * 0.8 + 0.6;
      z = (Math.random() - 0.5) * 0.2;
    } else {
      // Legs
      const side = Math.random() < 0.5 ? -1 : 1;
      x = side * (Math.random() * 0.2 + 0.1);
      y = Math.random() * -0.8;
      z = (Math.random() - 0.5) * 0.3;
    }
    
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    
    // Color gradient (blue to green to orange based on height)
    const normalizedY = (y + 1) / 3; // Normalize to 0-1
    if (normalizedY > 0.7) {
      // Blue (head)
      colors[i3] = 0.2;
      colors[i3 + 1] = 0.5;
      colors[i3 + 2] = 1.0;
    } else if (normalizedY > 0.4) {
      // Green (torso)
      colors[i3] = 0.2 + normalizedY * 0.5;
      colors[i3 + 1] = 0.8;
      colors[i3 + 2] = 0.3;
    } else {
      // Orange/Yellow (legs)
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.6 - normalizedY * 0.3;
      colors[i3 + 2] = 0.2;
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Scanning ring */}
      <mesh position={[0, scanProgress / 100 * 2 - 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.5, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
      </mesh>
    </>
  );
};

const BodyScan = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    navigate("/create-avatar");
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/create-avatar")}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h1 className="text-white text-xl font-bold mb-1">Full Body Scan</h1>
        <p className="text-white/70 text-sm">
          {isScanning ? "Scanning..." : "Scan Complete"}
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.3, 5], fov: 50 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <ParticleBody />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Center indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-cyan-400" />
          <div className="absolute inset-6 rounded-full bg-cyan-400/30" />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg px-6 py-3">
          <p className="text-sm text-white mb-2">
            {isScanning ? "Hold still while we capture your 360° scan" : "Scan captured successfully!"}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white">
            <Camera className="w-3 h-3" />
            <span>Drag to rotate • Scroll to zoom</span>
          </div>
        </div>
      </div>

      {/* Complete button */}
      {scanComplete && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <Button onClick={handleComplete} size="lg">
            Use This Scan
          </Button>
        </div>
      )}
    </div>
  );
};

export default BodyScan;
