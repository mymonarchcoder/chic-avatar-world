import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import referenceFace from "@/assets/reference-face.jpg";

const AvatarGeneration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const bodyType = searchParams.get("bodyType") || "athletic";
  const height = searchParams.get("height") || "average";
  const bodyPhotoParam = searchParams.get("bodyPhoto");

  const handleTryOnOutfit = () => {
    const outfitDescription = `Cream/beige Alo Yoga matching set:
- Oversized boxy hoodie with drawstrings and front kangaroo pocket
- Small "alo" logo embroidered on left chest
- Matching sweatpants with drawstring waist and "alo" logo on hip
- Soft, comfortable fleece material
- Relaxed, athleisure aesthetic`;

    navigate(`/tryon-generation?bodyType=${bodyType}&height=${height}&avatarImage=${encodeURIComponent(avatarImage || "")}&outfit=${encodeURIComponent(outfitDescription)}&size=xs`);
  };

  useEffect(() => {
    generateAvatar();
  }, []);

  const generateAvatar = async () => {
    try {
      setIsGenerating(true);
      
      // Convert reference image to base64
      const response = await fetch(referenceFace);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        
        // Call edge function to generate avatar
        const { data, error } = await supabase.functions.invoke('generate-avatar', {
          body: {
            bodyType,
            height,
            faceImageBase64: base64data,
            bodyPhotoBase64: bodyPhotoParam || null
          }
        });

        if (error) {
          console.error('Error generating avatar:', error);
          toast.error("Failed to generate avatar. Please try again.");
          setIsGenerating(false);
          return;
        }

        if (data?.imageUrl) {
          setAvatarImage(data.imageUrl);
          toast.success("Avatar generated successfully!");
        }
        
        setIsGenerating(false);
      };
      
      reader.readAsDataURL(blob);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate avatar");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-black mb-1">Generating Your Avatar</h1>
          <p className="text-gray-600 text-sm">
            Creating a personalized avatar with your specifications...
          </p>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-3" />
            <p className="text-gray-600">
              This may take 30-60 seconds...
            </p>
            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <p>• Body Type: {bodyType}</p>
              <p>• Height: {height}</p>
            </div>
          </div>
        ) : avatarImage ? (
          <div className="flex-1 flex flex-col items-center w-full max-w-md">
            <div className="flex-1 flex items-center justify-center w-full py-2">
              <img 
                src={avatarImage}
                alt="Generated Avatar"
                className="max-h-[calc(100vh-200px)] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center space-y-3 py-4">
              <p className="text-xs text-gray-600">
                Your personalized avatar is ready! Try on clothes virtually.
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={generateAvatar}
                  variant="outline"
                  size="sm"
                >
                  Regenerate
                </Button>
                <Button 
                  onClick={handleTryOnOutfit}
                  className="bg-primary text-primary-foreground"
                  size="sm"
                >
                  Try On Cream Alo Set (XS)
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to generate avatar</p>
            <button 
              onClick={generateAvatar}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarGeneration;
