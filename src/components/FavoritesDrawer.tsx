import { Heart, X, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

interface FavoriteItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

// Sample favorite items matching the product structure
const sampleFavorites: FavoriteItem[] = [
  { id: 1, name: "Classic White Tee", brand: "Essential", price: 49, image: "" },
  { id: 2, name: "Designer Sunglasses", brand: "Cool", price: 179, image: "" },
  { id: 3, name: "Minimalist Watch", brand: "Timeless", price: 199, image: "" },
  { id: 4, name: "Leather Jacket", brand: "Edgy", price: 299, image: "" },
];

const FavoritesDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(sampleFavorites);

  const removeItem = (itemId: number) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="hover:bg-primary/10 relative"
      >
        <Heart className="w-5 h-5" />
        {favorites.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b bg-gradient-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Favorites</h2>
                  <Button
                    onClick={() => setIsOpen(false)}
                    size="icon"
                    variant="ghost"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                <p className="text-sm opacity-90 mt-1">{favorites.length} saved items</p>
              </div>

              {/* Favorites Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground">No favorites yet</p>
                  </div>
                ) : (
                  favorites.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <p className="text-lg font-bold text-primary mt-1">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <Button
                          variant="outline"
                          className="flex-1 mr-2"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FavoritesDrawer;
