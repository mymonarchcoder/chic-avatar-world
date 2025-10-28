import { useEffect, useState } from "react";

interface AnimatedAvatarProps {
  src: string;
  rotation: number;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const AnimatedAvatar = ({
  src,
  rotation,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: AnimatedAvatarProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Cycle through animation phases every 4 seconds for smoother, more frequent movement
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Define different poses
  const getPoseStyles = () => {
    switch (animationPhase) {
      case 0: // Hands on hips, looking forward
        return {
          transform: `rotateY(${rotation}deg) translateX(0px) rotate(0deg)`,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1)) brightness(1)',
        };
      case 1: // Hand to hair, head tilted
        return {
          transform: `rotateY(${rotation}deg) translateX(-5px) rotate(-2deg)`,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1)) brightness(1.02)',
        };
      case 2: // Weight shift, looking away
        return {
          transform: `rotateY(${rotation + 5}deg) translateX(8px) rotate(1deg)`,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1)) brightness(0.98)',
        };
      case 3: // Subtle lean, hand moving down
        return {
          transform: `rotateY(${rotation - 3}deg) translateX(3px) rotate(-1deg)`,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1)) brightness(1.01)',
        };
      default:
        return {
          transform: `rotateY(${rotation}deg) translateX(0px) rotate(0deg)`,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1)) brightness(1)',
        };
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Breathing animation wrapper */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: 'breathe 3s ease-in-out infinite, subtleFloat 5s ease-in-out infinite',
        }}
      >
        <img
          src={src}
          alt="Your 3D Avatar"
          className="h-full w-auto object-contain cursor-grab active:cursor-grabbing select-none"
          style={{
            ...getPoseStyles(),
            transition: isDragging
              ? 'none'
              : 'all 4s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center center',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          draggable={false}
        />
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1.008) translateY(-4px);
          }
        }
        
        @keyframes subtleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(0.3deg);
          }
          75% {
            transform: translateY(-2px) rotate(-0.3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedAvatar;
