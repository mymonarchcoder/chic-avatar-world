import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import referenceFace from "@/assets/reference-face.jpg";

const AvatarGeneration = () => {
  const [searchParams] = useSearchParams();
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const bodyType = searchParams.get("bodyType") || "athletic";
  const height = searchParams.get("height") || "average";
  const bodyPhotoParam = searchParams.get("bodyPhoto");

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
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Generating Your Avatar</h1>
          <p className="text-muted-foreground">
            Creating a personalized avatar with your specifications...
          </p>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">
              This may take 30-60 seconds...
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>• Body Type: {bodyType}</p>
              <p>• Height: {height}</p>
            </div>
          </div>
        ) : avatarImage ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <img 
                src={avatarImage}
                alt="Generated Avatar"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your personalized avatar is ready! You can now use this to try on clothes virtually.
              </p>
              <button 
                onClick={generateAvatar}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Regenerate Avatar
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-red-500">Failed to generate avatar</p>
            <button 
              onClick={generateAvatar}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
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
