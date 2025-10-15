import { User, MessageCircle, Heart, Star, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import CartDrawer from "./CartDrawer";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favoriteCount } = useFavorites();
  const { openModal } = useAvatarModal();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "See you soon!",
      });
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 
              className="text-2xl font-bold text-gray-800 font-baloo cursor-pointer hover:opacity-80 transition-opacity" 
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
              className="hover:bg-primary/10"
              onClick={handleChatClick}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10"
              onClick={handleStarClick}
            >
              <Star className="w-5 h-5" />
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-primary/10"
              onClick={openModal}
            >
              <User className="w-5 h-5" />
            </Button>
            <CartDrawer />
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                className="hover:bg-primary/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="hover:bg-primary/10"
                onClick={() => navigate('/auth')}
              >
                Log In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;