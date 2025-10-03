import { Upload, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const AvatarSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.1em' }}>
              Your Virtual Fitting Room
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your photo to create a personalized 3D avatar and try on items from your favorite brands
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-8 shadow-card">
              <div className="aspect-square bg-gradient-primary/10 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-primary/30">
                <User className="w-32 h-32 text-primary/30" />
              </div>
              
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6">
                <Upload className="w-5 h-5 mr-2" />
                Upload Your Photo
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                We'll create a personalized 3D avatar for virtual try-ons
              </p>
            </Card>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Upload Your Photo</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a full-body photo for the most accurate avatar creation
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI Creates Your Avatar</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI generates a realistic 3D model based on your photo
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Try On & Mix-Match</h3>
                  <p className="text-sm text-muted-foreground">
                    Virtually try on items and create your perfect outfit combinations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvatarSection;