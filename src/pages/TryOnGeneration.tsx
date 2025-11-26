import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TryOnGeneration() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tryOnImage, setTryOnImage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const bodyType = searchParams.get("bodyType") || "petite";
  const height = searchParams.get("height") || "average";
  const avatarImage = searchParams.get("avatarImage") || "";
  const outfitDescription = searchParams.get("outfit") || "";
  const size = searchParams.get("size") || "xs";

  useEffect(() => {
    generateTryOn();
  }, []);

  const generateTryOn = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-tryon", {
        body: {
          avatarImageBase64: avatarImage,
          outfitDescription,
          size,
          bodyType,
          height,
        },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setTryOnImage(data.imageUrl);
        toast({
          title: "Try-On Complete!",
          description: "Your virtual try-on has been generated successfully.",
        });
      }
    } catch (error) {
      console.error("Error generating try-on:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate virtual try-on. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {isGenerating ? (
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <h2 className="text-2xl font-semibold">Generating Your Try-On...</h2>
          <p className="text-muted-foreground">
            Creating your personalized outfit visualization with {size.toUpperCase()} sizing
          </p>
          <div className="bg-muted/50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong>Body Type:</strong> {bodyType}<br />
              <strong>Height:</strong> {height}<br />
              <strong>Size:</strong> {size.toUpperCase()}<br />
              <strong>Outfit:</strong> Cream Alo Hoodie & Sweatpants Set
            </p>
          </div>
        </div>
      ) : tryOnImage ? (
        <div className="space-y-6 max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Your Virtual Try-On</h2>
            <p className="text-muted-foreground">XS - Oversized Fit</p>
          </div>
          
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <img
              src={tryOnImage}
              alt="Virtual try-on"
              className="w-full h-auto"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={generateTryOn}
              variant="outline"
            >
              Regenerate
            </Button>
            <Button onClick={() => navigate("/")}>
              Try Another Outfit
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Generation Failed</h2>
          <p className="text-muted-foreground">
            We couldn't generate your try-on. Please try again.
          </p>
          <Button onClick={generateTryOn}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}
