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
  const [facePhoto, setFacePhoto] = useState<string | null>(null);
  const [bodyPhoto1, setBodyPhoto1] = useState<string | null>(null);
  const [bodyPhoto2, setBodyPhoto2] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userName, setUserName] = useState("");

  const handleImageUpload = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>,
    photoType: 'face' | 'body1' | 'body2'
  ) => {
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

    const reader = new FileReader();
    
    reader.onload = async (event) => {
      const imageUrl = event.target?.result as string;
      
      // Set the appropriate photo state
      if (photoType === 'face') {
        setFacePhoto(imageUrl);
      } else if (photoType === 'body1') {
        setBodyPhoto1(imageUrl);
      } else {
        setBodyPhoto2(imageUrl);
      }
      
      toast.success("Photo uploaded successfully!");
    };
    
    reader.readAsDataURL(file);
  }, []);

  const handleFullBodyScan = () => {
    navigate('/body-scan');
  };

  const handleContinue = async () => {
    if (!facePhoto) {
      toast.error("Please upload a face close-up photo");
      return;
    }
    
    if (!bodyPhoto1) {
      toast.error("Please upload at least one full-body photo");
      return;
    }

    setIsProcessing(true);
    
    try {
      toast.loading("Creating your avatar...");
      const img = await loadImage(facePhoto);
      const processed = await removeBackground(img);
      setProcessedImage(processed);
      toast.success("Avatar created successfully!");
      setStep(2);
    } catch (error) {
      console.error('Failed to process image:', error);
      toast.error("Failed to process image. Please try again.");
      setProcessedImage(facePhoto);
      setStep(2);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = () => {
    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // Store avatar data
    localStorage.setItem('userAvatar', processedImage || facePhoto || '');
    localStorage.setItem('userName', userName);
    
    toast.success(`Welcome, ${userName}! Your avatar is ready.`);
    setStep(3);
    
    // Redirect to main app after a brief delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-2 pt-2">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-2 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-0.5">Welcome to VERS!</h1>
          <p className="text-muted-foreground text-xs tracking-wider">Create Your AI Shopping Avatar</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-xs ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                {step > 1 ? <CheckCircle2 className="w-3 h-3" /> : '1'}
              </div>
              <span className="hidden sm:inline text-xs">Upload</span>
            </div>
            
            <div className="w-6 h-0.5 bg-border"></div>
            
            <div className={`flex items-center gap-1 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-xs ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                {step > 2 ? <CheckCircle2 className="w-3 h-3" /> : '2'}
              </div>
              <span className="hidden sm:inline text-xs">Personalize</span>
            </div>
            
            <div className="w-6 h-0.5 bg-border"></div>
            
            <div className={`flex items-center gap-1 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-xs ${step >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                {step > 3 ? <CheckCircle2 className="w-3 h-3" /> : '3'}
              </div>
              <span className="hidden sm:inline text-xs">Complete</span>
            </div>
            
            <div className="w-6 h-0.5 bg-border"></div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 text-xs border-muted-foreground">
                4
              </div>
              <span className="hidden sm:inline text-xs">Step 4</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-3 md:p-4 animate-scale-in">
          {step === 1 && (
            <div className="space-y-2">
              <div className="text-center mb-2">
                <h2 className="text-lg font-bold mb-0.5">Upload Your Photos</h2>
                <p className="text-muted-foreground text-xs tracking-wide">
                  Create your AI shopping avatar by uploading a few photos. These help us render your body and facial details accurately.
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-3">
                <h3 className="font-semibold text-sm mb-2 tracking-wide">Upload Instructions:</h3>
                <p className="text-xs text-muted-foreground mb-2 tracking-wide">Please upload the following:</p>
                <ul className="text-xs text-muted-foreground space-y-1.5 ml-4 list-disc tracking-wide">
                  <li>1 clear, front-facing close-up of your face</li>
                  <li>1–2 full-body photos standing straight, well-lit, against a plain background</li>
                  <li><span className="text-muted-foreground/80">Optional:</span> Full-body scan (use camera mode to capture a 360° view if available)</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 tracking-wide">
                  <span className="font-medium">Supported formats:</span> PNG, JPG up to 10MB each
                </p>
              </div>

              <div className="space-y-4">
                {/* Face Photo Upload */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Face Close-Up *</Label>
                  <label htmlFor="face-upload" className="cursor-pointer block">
                    <div className="h-32 border-2 border-dashed border-primary rounded-lg flex items-center justify-center gap-3 hover:bg-muted/50 transition-colors px-3">
                      {facePhoto ? (
                        <div className="flex items-center gap-3 w-full">
                          <img src={facePhoto} alt="Face" className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Face photo uploaded</p>
                            <p className="text-xs text-muted-foreground tracking-wide">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-primary" />
                          <div>
                            <p className="font-medium text-sm">Upload face close-up</p>
                            <p className="text-xs text-muted-foreground tracking-wide">PNG, JPG up to 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Input
                      id="face-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'face')}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Body Photo 1 Upload */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Full-Body Photo 1 *</Label>
                  <label htmlFor="body1-upload" className="cursor-pointer block">
                    <div className="h-32 border-2 border-dashed border-primary rounded-lg flex items-center justify-center gap-3 hover:bg-muted/50 transition-colors px-3">
                      {bodyPhoto1 ? (
                        <div className="flex items-center gap-3 w-full">
                          <img src={bodyPhoto1} alt="Body 1" className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Full-body photo uploaded</p>
                            <p className="text-xs text-muted-foreground tracking-wide">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-primary" />
                          <div>
                            <p className="font-medium text-sm">Upload full-body photo</p>
                            <p className="text-xs text-muted-foreground tracking-wide">PNG, JPG up to 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Input
                      id="body1-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'body1')}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Body Photo 2 Upload */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Full-Body Photo 2 (Optional)</Label>
                  <label htmlFor="body2-upload" className="cursor-pointer block">
                    <div className="h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center gap-3 hover:bg-muted/50 transition-colors px-3">
                      {bodyPhoto2 ? (
                        <div className="flex items-center gap-3 w-full">
                          <img src={bodyPhoto2} alt="Body 2" className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Full-body photo uploaded</p>
                            <p className="text-xs text-muted-foreground tracking-wide">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Upload second full-body photo</p>
                            <p className="text-xs text-muted-foreground tracking-wide">PNG, JPG up to 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Input
                      id="body2-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'body2')}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Full Body Scan Button */}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleFullBodyScan}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Full Body Scan (360° view)
                  </Button>
                </div>

                {/* Continue Button */}
                <div className="pt-2">
                  <Button
                    className="w-full"
                    onClick={handleContinue}
                    disabled={isProcessing || !facePhoto || !bodyPhoto1}
                  >
                    {isProcessing ? "Processing..." : "Continue"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mt-2">
                <h3 className="font-semibold text-sm mb-2 tracking-wide">
                  Tips for best results:
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc tracking-wide">
                  <li>Use a well-lit area with a neutral background</li>
                  <li>Face the camera directly with a natural expression</li>
                  <li>Ensure your full face and shoulders are visible in the close-up</li>
                  <li>For full-body shots, include your entire figure (head to feet)</li>
                  <li>Avoid sunglasses, hats, or accessories that obscure your face</li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <div className="text-center mb-2">
                <h2 className="text-lg font-bold mb-0.5">Personalize Your Profile</h2>
                <p className="text-muted-foreground text-xs tracking-wide">
                  Tell us a bit about yourself
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3 items-center">
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-primary shadow-lg">
                    <img 
                      src={processedImage || facePhoto || ''}
                      alt="Your avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div>
                    <Label htmlFor="userName" className="text-xs">What should we call you?</Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <User className="w-3 h-3 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-xs mb-0.5">Your AI Shopping Assistant</h4>
                        <p className="text-xs text-muted-foreground tracking-wide">
                          Try on clothes virtually and get personalized style recommendations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleComplete} 
                    className="w-full mt-1"
                  >
                    Complete Setup
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-2 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-1">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold">You're All Set!</h2>
              <p className="text-muted-foreground text-xs max-w-md mx-auto tracking-wide">
                Your AI shopping avatar is ready. Get ready for personalized virtual try-ons!
              </p>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-primary mt-1"></div>
              <p className="text-xs text-muted-foreground tracking-wide">Redirecting...</p>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-2 text-xs text-muted-foreground tracking-wide">
          <p>Your photos are processed securely and never shared.</p>
        </div>
      </div>
    </div>
  );
};

export default CreateAvatar;
