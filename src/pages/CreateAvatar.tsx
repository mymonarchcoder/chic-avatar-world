import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, User, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";

const CreateAvatar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userName, setUserName] = useState("");

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      const imageUrl = event.target?.result as string;
      setUploadedImage(imageUrl);
      
      try {
        toast.loading("Creating your avatar...");
        const img = await loadImage(imageUrl);
        const processed = await removeBackground(img);
        setProcessedImage(processed);
        toast.success("Avatar created successfully!");
        setStep(2);
      } catch (error) {
        console.error('Failed to process image:', error);
        toast.error("Failed to process image. Please try again.");
        setProcessedImage(imageUrl);
      } finally {
        setIsProcessing(false);
      }
    };
    
    reader.readAsDataURL(file);
  }, []);

  const handleComplete = () => {
    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // Store avatar data (in a real app, this would save to backend)
    localStorage.setItem('userAvatar', processedImage || uploadedImage || '');
    localStorage.setItem('userName', userName);
    
    toast.success(`Welcome, ${userName}! Your avatar is ready.`);
    setStep(3);
    
    // Redirect to main app after a brief delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-start justify-center p-3 pt-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold">VERS</h1>
          </div>
          <p className="text-muted-foreground text-sm">Create Your AI Shopping Avatar</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
              </div>
              <span className="hidden sm:inline font-medium text-sm">Upload</span>
            </div>
            
            <div className="w-8 h-0.5 bg-border"></div>
            
            <div className={`flex items-center gap-1 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : '2'}
              </div>
              <span className="hidden sm:inline font-medium text-sm">Personalize</span>
            </div>
            
            <div className="w-8 h-0.5 bg-border"></div>
            
            <div className={`flex items-center gap-1 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs ${step >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                {step > 3 ? <CheckCircle2 className="w-4 h-4" /> : '3'}
              </div>
              <span className="hidden sm:inline font-medium text-sm">Complete</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-4 md:p-6 animate-scale-in">
          {step === 1 && (
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold mb-1">Upload Your Photo</h2>
                <p className="text-muted-foreground text-sm">
                  Choose a clear, front-facing photo
                </p>
              </div>

              <div className="flex flex-col items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="w-48 h-48 border-2 border-dashed border-primary rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-primary" />
                        <div className="text-center px-4">
                          <p className="font-medium text-sm mb-0.5">Click to upload</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      </>
                    )}
                  </div>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isProcessing}
                  />
                </label>

                {isProcessing && (
                  <div className="mt-3 text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <p className="mt-1 text-xs text-muted-foreground">Processing...</p>
                  </div>
                )}
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mt-3">
                <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Tips for best results:
                </h3>
                <ul className="text-xs text-muted-foreground space-y-0.5 ml-5 list-disc">
                  <li>Use a well-lit photo with a clear background</li>
                  <li>Face the camera directly with a neutral expression</li>
                  <li>Ensure your full face and shoulders are visible</li>
                  <li>Avoid sunglasses or accessories covering your face</li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold mb-1">Personalize Your Profile</h2>
                <p className="text-muted-foreground text-sm">
                  Tell us a bit about yourself
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                    <img 
                      src={processedImage || uploadedImage || ''}
                      alt="Your avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full space-y-3">
                  <div>
                    <Label htmlFor="userName" className="text-sm">What should we call you?</Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">Your AI Shopping Assistant</h4>
                        <p className="text-xs text-muted-foreground">
                          Try on clothes virtually and get personalized style recommendations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleComplete} 
                    className="w-full mt-2"
                  >
                    Complete Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-3 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">You're All Set!</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your AI shopping avatar is ready. Get ready for personalized virtual try-ons!
              </p>
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-primary mt-2"></div>
              <p className="text-xs text-muted-foreground">Redirecting...</p>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-3 text-xs text-muted-foreground">
          <p>Your photo is processed securely and never shared</p>
        </div>
      </div>
    </div>
  );
};

export default CreateAvatar;
