import { Scan, User, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

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
  const [bodyPhoto, setBodyPhoto] = useState<string | null>(null);
  
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

  const handleBodyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBodyPhoto(reader.result as string);
      toast.success("Body photo uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleTryWithAvatar = async () => {
    if (!selectedBodyType || !selectedHeight) return;
    
    setShowModal(false);
    
    // Navigate to avatar generation page with optional body photo
    const params = new URLSearchParams({
      bodyType: selectedBodyType,
      height: selectedHeight,
      ...(bodyPhoto && { bodyPhoto: bodyPhoto })
    });
    
    window.open(
      `${window.location.origin}/avatar-generation?${params.toString()}`,
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
        className="fixed bottom-6 right-6 z-[9999] bg-pink-500 text-white border-2 border-pink-600 hover:bg-pink-600 shadow-lg rounded-full px-6 py-6 flex items-center gap-2 transition-all hover:scale-105"
      >
        <Scan className="w-5 h-5" />
        Try On
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white text-black">
          <DialogHeader className="pt-3 pb-2">
            <DialogTitle className="text-lg font-bold">Try On Your Avatar</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-1">
            {/* Body Type Selection */}
            <div>
              <h3 className="text-xs font-semibold mb-1.5">Select Body Type</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {bodyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedBodyType(type.id)}
                    className={`p-2 rounded-md border transition-all text-left ${
                      selectedBodyType === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <User className="w-3 h-3 mt-0.5" />
                      <div>
                        <p className="font-semibold text-xs">{type.label}</p>
                        <p className="text-[10px] text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Height Selection */}
            <div>
              <h3 className="text-xs font-semibold mb-1.5">Select Height</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {heights.map((height) => (
                  <button
                    key={height.id}
                    onClick={() => setSelectedHeight(height.id)}
                    className={`p-2 rounded-md border transition-all ${
                      selectedHeight === height.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="font-semibold text-xs">{height.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Body Photo Upload */}
            <div>
              <h3 className="text-xs font-semibold mb-1.5">
                Upload Full Body Photo <span className="text-[10px] text-muted-foreground">(Optional)</span>
              </h3>
              <div className="relative">
                <input
                  type="file"
                  id="body-photo"
                  accept="image/*"
                  onChange={handleBodyPhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="body-photo"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-md border border-dashed border-border hover:border-primary/50 cursor-pointer transition-all"
                >
                  <Upload className="w-3 h-3" />
                  <span className="text-xs">
                    {bodyPhoto ? "Photo uploaded ✓" : "Click to upload"}
                  </span>
                </label>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                For better accuracy, upload a full body photo in form-fitting clothes
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-1.5 pt-1">
              <Button
                onClick={handleTryWithAvatar}
                disabled={!selectedBodyType || !selectedHeight}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs"
              >
                <Scan className="w-3 h-3 mr-1.5" />
                Try On with Selected Avatar
              </Button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePersonalize}
                variant="outline"
                className="w-full h-8 text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                Personalize Your Avatar
              </Button>
              <p className="text-[10px] text-center text-muted-foreground px-2">
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
