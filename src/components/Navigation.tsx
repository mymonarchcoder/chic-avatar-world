import { User, MessageCircle, Heart } from "lucide-react";
import { Button } from "./ui/button";
import CartDrawer from "./CartDrawer";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favoriteCount } = useFavorites();

  const handleHeartClick = () => {
    if (location.pathname === '/favorites') {
      navigate('/');
    } else {
      navigate('/favorites');
    }
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-800 font-baloo" style={{ letterSpacing: '-0.1em' }}>
              VERS
            </h1>
            <div className="hidden sm:flex gap-6">
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
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10"
              onClick={handleChatClick}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10 relative"
              onClick={handleHeartClick}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <User className="w-5 h-5" />
            </Button>
            <CartDrawer />
            <Button variant="ghost" className="hover:bg-primary/10">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;