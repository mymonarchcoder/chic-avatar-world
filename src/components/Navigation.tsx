import { User, MessageCircle, Heart, Star } from "lucide-react";
import { Button } from "./ui/button";
import CartDrawer from "./CartDrawer";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAvatarModal } from "@/contexts/AvatarModalContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favoriteCount } = useFavorites();
  const { openModal } = useAvatarModal();

  const handleHeartClick = () => {
    if (location.pathname === '/favorites') {
      navigate('/');
    } else {
      navigate('/favorites');
    }
  };

  const handleStarClick = () => {
    if (location.pathname === '/favorite-brands') {
      navigate('/');
    } else {
      navigate('/favorite-brands');
    }
  };

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 
              className="text-2xl font-bold text-primary font-baloo cursor-pointer hover:opacity-80 transition-opacity" 
              style={{ letterSpacing: '-0.1em' }}
              onClick={() => navigate('/')}
            >
              VERS
            </h1>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground text-sm px-2"
                onClick={() => navigate('/brands')}
              >
                Brands
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm px-2 hidden sm:block">
                New Arrivals
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10 text-primary"
              onClick={handleChatClick}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10 text-primary"
              onClick={handleStarClick}
            >
              <Star className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10 relative text-primary"
              onClick={handleHeartClick}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10 text-primary"
              onClick={openModal}
            >
              <User className="w-5 h-5" />
            </Button>
            <CartDrawer />
            <Button 
              variant="ghost" 
              className="hover:bg-primary/10"
              onClick={() => navigate('/auth')}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;