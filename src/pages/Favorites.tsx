import { Trash2, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import AvatarWidget from "@/components/AvatarWidget";
import whiteTeeImg from "@/assets/white-tee.png";
import satinDressImg from "@/assets/satin-slip-dress.png";
import jeansImg from "@/assets/high-waist-jeans.png";
import blazerImg from "@/assets/cropped-blazer.png";

const Favorites = () => {
  const { favorites, removeFavorite, favoriteCount, favoriteBrands } = useFavorites();
  const { openModal } = useAvatarModal();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>
              My Favorites
            </h1>
            <p className="text-lg text-muted-foreground">
              {favoriteCount} saved items • {favoriteBrands.length} favorite brands
            </p>
          </div>

          {favoriteBrands.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ letterSpacing: '-0.1em' }}>
                Favorite Brands
              </h2>
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
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ letterSpacing: '-0.1em' }}>
              Saved Items
            </h2>

          {favorites.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground">Start adding items you love!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.map((item) => (
                <Card 
                  key={item.id}
                  className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    {item.id === 1 ? (
                      <img 
                        src={whiteTeeImg} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : item.id === 2 ? (
                      <img 
                        src={satinDressImg} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : item.id === 3 ? (
                      <img 
                        src={jeansImg} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : item.id === 4 ? (
                      <img 
                        src={blazerImg} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                    )}
                  </div>
                  
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-lg font-bold text-primary mb-3">${item.price}</p>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={openModal}
                        >
                          Try On
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                        >
                          Add to Cart
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-destructive hover:bg-destructive/10 text-xs"
                        onClick={() => removeFavorite(item.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
