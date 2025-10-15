import { useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  { id: 5, name: "Black Tailored Pants", brand: "Elegant", price: 129, image: "" },
  { id: 6, name: "Casual Sneakers", brand: "Sporty", price: 149, image: "" },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(sampleFavorites);

  const removeItem = (itemId: number) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>
              My Favorites
            </h1>
            <p className="text-lg text-muted-foreground">{favorites.length} saved items</p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground">Start adding items you love!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <Card 
                  key={item.id}
                  className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-4xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>{item.brand}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{item.name}</p>
                    <p className="text-2xl font-bold text-primary mb-4">${item.price}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
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
  );
};

export default Favorites;
