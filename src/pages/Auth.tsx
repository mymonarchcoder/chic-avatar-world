import { useState } from "react";
import { Upload, User, Mail, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import AvatarWidget from "@/components/AvatarWidget";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { openModal } = useAvatarModal();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? "Logged in!" : "Account created!",
      description: "Welcome to VERS",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.1em' }}>
              {isLogin ? "Welcome Back" : "Join VERS"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isLogin ? "Log in to access your virtual fitting room" : "Create your account and start trying on"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Auth Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6" style={{ letterSpacing: '-0.1em' }}>
                {isLogin ? "Log In" : "Sign Up"}
              </h2>
              
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                  {isLogin ? "Log In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:underline"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>
            </Card>

            {/* Right Column - Virtual Fitting Room Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ letterSpacing: '-0.1em' }}>
                Your Virtual Fitting Room
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Upload your photo to create a personalized 3D avatar and try on items from your favorite brands
              </p>

              <Card className="p-8 shadow-card mb-6">
                <div className="aspect-square bg-gradient-primary/10 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-primary/30">
                  <User className="w-32 h-32 text-primary/30" />
                </div>
                
                <Button 
                  onClick={openModal}
                  className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6"
                >
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
                    <h3 className="font-semibold mb-1" style={{ letterSpacing: '-0.1em' }}>Upload Your Photo</h3>
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
                    <h3 className="font-semibold mb-1" style={{ letterSpacing: '-0.1em' }}>AI Creates Your Avatar</h3>
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
                    <h3 className="font-semibold mb-1" style={{ letterSpacing: '-0.1em' }}>Try On & Mix-Match</h3>
                    <p className="text-sm text-muted-foreground">
                      Virtually try on items and create your perfect outfit combinations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
