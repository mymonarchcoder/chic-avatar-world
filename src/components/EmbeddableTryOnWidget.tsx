import { Scan, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface EmbeddableTryOnWidgetProps {
  productUrl?: string;
  productName?: string;
  productImage?: string;
}

const EmbeddableTryOnWidget = ({ 
  productUrl, 
  productName, 
  productImage 
}: EmbeddableTryOnWidgetProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");
  const [selectedHeight, setSelectedHeight] = useState<string>("");
  
  const bodyTypes = [
    { id: "petite", label: "Petite", description: "5'0\" - 5'3\"" },
    { id: "athletic", label: "Athletic", description: "Toned & fit" },
    { id: "curvy", label: "Curvy", description: "Hourglass shape" },
    { id: "plus", label: "Plus", description: "Size 14+" },
  ];

  const heights = [
    { id: "short", label: "5'0\" - 5'3\"" },
    { id: "average", label: "5'4\" - 5'7\"" },
    { id: "tall", label: "5'8\" - 6'0\"" },
    { id: "verytall", label: "6'0\"+" },
  ];

  const handleTryWithAvatar = async () => {
    if (!selectedBodyType || !selectedHeight) return;
    
    setShowModal(false);
    
    // Navigate to avatar generation page
    window.open(
      `${window.location.origin}/avatar-generation?bodyType=${selectedBodyType}&height=${selectedHeight}`,
      '_blank',
      'width=1200,height=800'
    );
  };

  const handlePersonalize = () => {
    // Navigate to the full app for personalization
    const params = new URLSearchParams({
      ...(productUrl && { url: productUrl }),
      ...(productName && { name: productName }),
      ...(productImage && { image: productImage }),
    });
    
    window.open(
      `${window.location.origin}/create-avatar?${params.toString()}`,
      '_blank',
      'width=1200,height=800'
    );
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-[9999] bg-[hsl(220,15%,85%)] text-foreground hover:bg-[hsl(220,15%,75%)] shadow-lg rounded-full px-6 py-6 flex items-center gap-2 transition-all hover:scale-105"
      >
        <Scan className="w-5 h-5" />
        Try On
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader className="pt-4">
            <DialogTitle className="text-xl font-bold">Try On Your Avatar</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Body Type Selection */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Select Body Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {bodyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedBodyType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedBodyType === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">{type.label}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Height Selection */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Select Height</h3>
              <div className="grid grid-cols-2 gap-2">
                {heights.map((height) => (
                  <button
                    key={height.id}
                    onClick={() => setSelectedHeight(height.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedHeight === height.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="font-semibold text-sm">{height.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={handleTryWithAvatar}
                disabled={!selectedBodyType || !selectedHeight}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Scan className="w-4 h-4 mr-2" />
                Try On with Selected Avatar
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePersonalize}
                variant="outline"
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Personalize Your Avatar
              </Button>
              <p className="text-xs text-center text-muted-foreground px-4">
                Create a fully customized avatar with body measurements, skin tone, and more
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmbeddableTryOnWidget;
