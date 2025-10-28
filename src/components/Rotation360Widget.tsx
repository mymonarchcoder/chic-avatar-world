import { RotateCw } from "lucide-react";

interface Rotation360WidgetProps {
  rotation: number;
  onRotationChange: (rotation: number) => void;
}

const Rotation360Widget = ({ rotation, onRotationChange }: Rotation360WidgetProps) => {
  const handleClick = (angle: number) => {
    onRotationChange(angle);
  };

  const normalizedRotation = ((rotation % 360) + 360) % 360;

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      {/* Rotation Circle */}
      <div className="relative w-32 h-32">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-2 border-border bg-background/50 backdrop-blur-sm">
          {/* Rotation markers */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <button
              key={angle}
              onClick={() => handleClick(angle)}
              className="absolute w-3 h-3 rounded-full bg-primary/30 hover:bg-primary hover:scale-150 transition-all cursor-pointer"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-56px)`,
              }}
              title={`${angle}°`}
            />
          ))}
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <RotateCw className="w-8 h-8 text-muted-foreground" />
          </div>
          
          {/* Current rotation indicator */}
          <div
            className="absolute top-1/2 left-1/2 w-1 h-16 bg-accent origin-bottom transition-transform duration-300"
            style={{
              transform: `translate(-50%, -100%) rotate(${normalizedRotation}deg)`,
            }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-lg" />
          </div>
        </div>
      </div>

      {/* Rotation value display */}
      <div className="text-sm font-medium text-muted-foreground">
        {Math.round(normalizedRotation)}°
      </div>

      {/* Quick rotation buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onRotationChange(rotation - 45)}
          className="px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
        >
          ← 45°
        </button>
        <button
          onClick={() => onRotationChange(0)}
          className="px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => onRotationChange(rotation + 45)}
          className="px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
        >
          45° →
        </button>
      </div>
    </div>
  );
};

export default Rotation360Widget;
