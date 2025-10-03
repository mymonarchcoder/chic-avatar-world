import { Heart, User, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import CartDrawer from "./CartDrawer";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-800" style={{ letterSpacing: '-0.1em' }}>
              Monarch
            </h1>
            <div className="hidden md:flex gap-6">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Brands
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                New Arrivals
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Collections
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="hover:bg-primary/10">
              Log In
            </Button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;