import { useState } from "react";
import { Upload, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isLogin ? "Logged in!" : "Account created!",
      description: "Welcome to twinnX",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.1em' }}>
              {isLogin ? "Welcome Back" : "Join twinnX"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isLogin ? "Log in to access your virtual fitting room" : "Create your account and start trying on"}
            </p>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default Auth;
