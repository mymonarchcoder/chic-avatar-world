import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, User, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Avatar3D } from "@/components/Avatar3D";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const personalizeSchema = z.object({
  userName: z.string().optional(),
  heightFt: z.string().optional(),
  heightIn: z.string().optional(),
  heightCm: z.string().optional(),
  weight: z.string().optional(),
  weightUnit: z.enum(["lbs", "kg"]).optional(),
  bodyType: z.string().optional(),
  topSize: z.string().optional(),
  topFit: z.string().optional(),
  bottomSize: z.string().optional(),
  bottomFit: z.string().optional(),
  shoeSize: z.string().optional(),
  fitPriority: z.string().optional(),
  colors: z.array(z.string()).optional(),
  fabrics: z.array(z.string()).optional(),
  occasions: z.array(z.string()).optional(),
});

const CreateAvatar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [facePhoto, setFacePhoto] = useState<string | null>(null);
  const [bodyPhoto1, setBodyPhoto1] = useState<string | null>(null);
  const [bodyPhoto2, setBodyPhoto2] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [avatarReady, setAvatarReady] = useState(false);
  
  const form = useForm<z.infer<typeof personalizeSchema>>({
    resolver: zodResolver(personalizeSchema),
    defaultValues: {
      userName: "",
      weightUnit: "lbs",
      colors: [],
      fabrics: [],
      occasions: [],
    },
  });

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
    // Demo mode - skip validation
    setStep(2);
  };

  const handleComplete = (data: z.infer<typeof personalizeSchema>) => {
    // Store avatar data and preferences
    localStorage.setItem('userAvatar', processedImage || facePhoto || '');
    localStorage.setItem('userName', data.userName || '');
    localStorage.setItem('userPreferences', JSON.stringify(data));
    
    setStep(3);
    setAvatarReady(false);
    
    // Simulate avatar generation - show completion after 3 seconds
    setTimeout(() => {
      setAvatarReady(true);
    }, 3000);
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
                  <li><span className="text-muted-foreground/80">Optional:</span> Full-body scan (use camera mode to capture a 360° view if available)</li>
                  <li>1 clear, front-facing close-up of your face</li>
                  <li>1–2 full-body photos standing straight, well-lit, against a plain background</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 tracking-wide">
                  <span className="font-medium">Supported formats:</span> PNG, JPG up to 10MB each
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Body Scan Button - Moved to top */}
                <div>
                  <Button
                    className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleFullBodyScan}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Full Body Scan (360° view)</span>
                      <span className="text-xs opacity-90">Recommended for best results</span>
                    </div>
                  </Button>
                </div>

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

                {/* Continue Button */}
                <div className="pt-2">
                  <Button
                    className="w-full"
                    onClick={handleContinue}
                  >
                    Continue
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
            <div className="space-y-4">
              <div className="text-center mb-3">
                <h2 className="text-lg font-bold mb-0.5">Personalize Your Profile</h2>
                <p className="text-muted-foreground text-xs tracking-wide">
                  Help us create the perfect fit for you
                </p>
              </div>

              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-lg">
                  <img 
                    src={processedImage || facePhoto || ''}
                    alt="Your avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleComplete)} className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">What should we call you? *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Core Body Data */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Core Body Data</h3>
                    
                    {/* Height */}
                    <div className="space-y-2">
                      <Label className="text-sm">Height</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name="heightFt"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="ft" type="number" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="heightIn"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="in" type="number" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="heightCm"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="or cm" type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Weight */}
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Weight</FormLabel>
                            <FormControl>
                              <Input placeholder="Weight" type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="weightUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="lbs">lbs</SelectItem>
                                <SelectItem value="kg">kg</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Body Type */}
                    <FormField
                      control={form.control}
                      name="bodyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Body Type (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="athletic">Athletic</SelectItem>
                              <SelectItem value="curvy">Curvy</SelectItem>
                              <SelectItem value="lean">Lean</SelectItem>
                              <SelectItem value="broad">Broad-shouldered</SelectItem>
                              <SelectItem value="petite">Petite</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {/* Top Size */}
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="topSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Top Size</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="xs">XS</SelectItem>
                                <SelectItem value="s">S</SelectItem>
                                <SelectItem value="m">M</SelectItem>
                                <SelectItem value="l">L</SelectItem>
                                <SelectItem value="xl">XL</SelectItem>
                                <SelectItem value="xxl">XXL</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="topFit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Fit</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Fit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fitted">Fitted</SelectItem>
                                <SelectItem value="true">True to Size</SelectItem>
                                <SelectItem value="oversized">Oversized</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Bottom Size */}
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="bottomSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Bottom Size</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="xs">XS</SelectItem>
                                <SelectItem value="s">S</SelectItem>
                                <SelectItem value="m">M</SelectItem>
                                <SelectItem value="l">L</SelectItem>
                                <SelectItem value="xl">XL</SelectItem>
                                <SelectItem value="xxl">XXL</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bottomFit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Fit</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Fit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fitted">Fitted</SelectItem>
                                <SelectItem value="true">True to Size</SelectItem>
                                <SelectItem value="oversized">Oversized</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Shoe Size */}
                    <FormField
                      control={form.control}
                      name="shoeSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Shoe Size (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 9, 10.5" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Fit Priorities */}
                    <FormField
                      control={form.control}
                      name="fitPriority"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-sm">Fit Priorities</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="comfort" />
                                </FormControl>
                                <FormLabel className="font-normal text-sm">
                                  Comfort
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="performance" />
                                </FormControl>
                                <FormLabel className="font-normal text-sm">
                                  Performance
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="style" />
                                </FormControl>
                                <FormLabel className="font-normal text-sm">
                                  Style / Trend
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="sustainability" />
                                </FormControl>
                                <FormLabel className="font-normal text-sm">
                                  Sustainability
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Style & Fit Preferences */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Style & Fit Preferences</h3>
                    
                    {/* Favorite Colors */}
                    <FormField
                      control={form.control}
                      name="colors"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-sm">Favorite Colors (select multiple)</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {["Neutrals", "Brights", "Pastels", "Earth Tones", "Black & White", "Jewel Tones"].map((color) => (
                              <FormField
                                key={color}
                                control={form.control}
                                name="colors"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(color)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], color])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== color)
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">
                                      {color}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Preferred Fabrics */}
                    <FormField
                      control={form.control}
                      name="fabrics"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-sm">Preferred Fabrics (select multiple)</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {["Cotton", "Modal", "Bamboo", "Recycled Poly", "Linen", "Merino Wool"].map((fabric) => (
                              <FormField
                                key={fabric}
                                control={form.control}
                                name="fabrics"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(fabric)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], fabric])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== fabric)
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">
                                      {fabric}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Occasion Tags */}
                    <FormField
                      control={form.control}
                      name="occasions"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-sm">Occasion Tags (select multiple)</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {["Lounge", "Gym", "Casual Out", "Work From Home", "Athleisure", "Travel"].map((occasion) => (
                              <FormField
                                key={occasion}
                                control={form.control}
                                name="occasions"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(occasion)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], occasion])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== occasion)
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">
                                      {occasion}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Complete Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              {!avatarReady ? (
                <>
                  {/* 3D Avatar Loading Animation */}
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-[hsl(225_73%_57%)] border-t-transparent animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-[hsl(225_73%_57%)]/40 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-12 h-12 text-[hsl(225_73%_57%)] animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">We're building your digital twin… just a sec!</h2>
                    <div className="space-y-2 max-w-md mx-auto">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-[hsl(225_73%_57%)] animate-[slide-in-right_2s_ease-in-out_infinite]"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(225_73%_57%)] mb-2">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Your avatar is ready!</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                    You'll get exclusive early access to try-on looks from your favorite brands!
                  </p>
                  <div className="flex justify-center -mx-6">
                    <Avatar3D className="w-full h-[600px]" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click and drag to rotate • Scroll to zoom
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => navigate('/')}
                  >
                    Let's go!
                  </Button>
                </div>
              )}
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
