import { Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";
import AvatarWidget from "@/components/AvatarWidget";

const FavoriteBrands = () => {
  const { favoriteBrands } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>
              Favorite Brands
            </h1>
            <p className="text-lg text-muted-foreground">{favoriteBrands.length} starred brands</p>
          </div>

          {favoriteBrands.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Star className="w-12 h-12 text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No favorite brands yet</h2>
              <p className="text-muted-foreground">Start starring brands you love!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteBrands.map((brand) => (
                <Card 
                  key={brand.id} 
                  className="group relative overflow-hidden border-border hover:shadow-elegant transition-all duration-300"
                >
                  <div className="aspect-[3/1] bg-background flex items-center justify-center p-6">
                    <img src={brand.logo} alt={brand.name} className="h-20 w-auto object-contain" />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold mb-1" style={{ letterSpacing: '-0.1em' }}>{brand.name}</h3>
                        <p className="text-xs text-muted-foreground">{brand.category}</p>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm"
                      className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs"
                    >
                      Explore Collection
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteBrands;
