import { useState, useEffect, useRef } from "react";
import avatarShowcase from "@/assets/avatar-showcase.png";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";
import AnimatedAvatar from "./AnimatedAvatar";

interface ProductPageAvatarProps {
  productImage?: string;
  isTryingOn: boolean;
}

const ProductPageAvatar = ({ productImage, isTryingOn }: ProductPageAvatarProps) => {
  const [processedAvatar, setProcessedAvatar] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [avatarDimensions, setAvatarDimensions] = useState<{width: number, height: number} | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        const img = await loadImage(avatarShowcase);
        const result = await removeBackground(img);
        setProcessedAvatar(result);
      } catch (error) {
        console.error('Failed to process avatar:', error);
        setProcessedAvatar(avatarShowcase);
      }
    };
    processImage();
  }, []);

  // Track avatar dimensions for product positioning
  useEffect(() => {
    const updateDimensions = () => {
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        setAvatarDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="sticky top-24 aspect-[3/4] bg-muted/30 rounded-lg overflow-hidden">
      <div 
        ref={avatarRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <AnimatedAvatar
          src={processedAvatar || avatarShowcase}
          rotation={rotation}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {/* Product overlay when trying on */}
        {isTryingOn && productImage && avatarDimensions && (
          <div 
            className="absolute pointer-events-none"
            style={{
              top: `${avatarDimensions.height * 0.45}%`,
              left: '50%',
              transform: `translateX(-50%) rotateY(${rotation}deg)`,
              width: `${avatarDimensions.width * 0.65}px`,
              height: `${avatarDimensions.height * 0.50}px`,
              zIndex: 2,
              mixBlendMode: 'multiply',
              opacity: 0.95,
              transition: isDragging ? 'none' : 'all 0.5s ease-in-out',
            }}
          >
            <img
              src={productImage}
              alt="Product on avatar"
              className="w-full h-full object-cover"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2)) contrast(1.1)',
                clipPath: 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)',
              }}
            />
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-muted-foreground">
        Drag to rotate 360°
      </div>
    </div>
  );
};

export default ProductPageAvatar;
