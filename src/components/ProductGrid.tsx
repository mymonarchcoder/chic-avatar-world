import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const products = [
  { id: 1, name: "Leather Jacket", brand: "Luxury", price: 599, image: "" },
  { id: 2, name: "Sneakers", brand: "Urban", price: 249, image: "" },
  { id: 3, name: "Suit", brand: "Elegant", price: 899, image: "" },
  { id: 4, name: "Hoodie", brand: "Active", price: 129, image: "" },
  { id: 5, name: "Denim", brand: "Comfort", price: 179, image: "" },
  { id: 6, name: "Dress", brand: "Trend", price: 449, image: "" },
  { id: 7, name: "Blazer", brand: "Elite", price: 399, image: "" },
  { id: 8, name: "Runners", brand: "Sport", price: 189, image: "" },
  { id: 9, name: "Blouse", brand: "Chic", price: 229, image: "" },
  { id: 10, name: "Bomber", brand: "Street", price: 349, image: "" },
  { id: 11, name: "Yoga Pants", brand: "Flex", price: 89, image: "" },
  { id: 12, name: "Trench", brand: "Classic", price: 549, image: "" },
  { id: 13, name: "Boots", brand: "Premium", price: 299, image: "" },
  { id: 14, name: "Sweater", brand: "Cozy", price: 159, image: "" },
  { id: 15, name: "Cargo Pants", brand: "Utility", price: 139, image: "" },
  { id: 16, name: "Polo", brand: "Preppy", price: 79, image: "" },
  { id: 17, name: "Maxi Skirt", brand: "Boho", price: 119, image: "" },
  { id: 18, name: "Puffer Vest", brand: "Outdoor", price: 169, image: "" },
  { id: 19, name: "Loafers", brand: "Refined", price: 219, image: "" },
  { id: 20, name: "Midi Dress", brand: "Feminine", price: 279, image: "" },
  { id: 21, name: "Tank Top", brand: "Active", price: 49, image: "" },
  { id: 22, name: "Chinos", brand: "Smart", price: 129, image: "" },
  { id: 23, name: "Cardigan", brand: "Warm", price: 149, image: "" },
  { id: 24, name: "Sandals", brand: "Summer", price: 89, image: "" },
  { id: 25, name: "T-Shirt", brand: "Basic", price: 39, image: "" },
  { id: 26, name: "Jumpsuit", brand: "Bold", price: 199, image: "" },
  { id: 27, name: "Scarf", brand: "Accent", price: 59, image: "" },
  { id: 28, name: "Backpack", brand: "Travel", price: 149, image: "" },
  { id: 29, name: "Hat", brand: "Style", price: 69, image: "" },
  { id: 30, name: "Sunglasses", brand: "Cool", price: 179, image: "" },
];

const ProductGrid = () => {
  const { toast } = useToast();

  const addToCart = async (product: typeof products[0]) => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Authentication required",
          description: "Please log in to add items to your cart. We'll add a login page soon!",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: String(product.id),
          product_name: product.name,
          product_brand: product.brand,
          product_price: product.price,
          quantity: 1
        });

      if (error) {
        console.error("Insert error:", error);
        toast({
          title: "Error",
          description: "Failed to add item to cart",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trending Now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest styles curated just for you
          </p>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-2">
                <p className="text-[10px] text-muted-foreground mb-0.5 truncate">{product.brand}</p>
                <h3 className="text-xs font-semibold mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-bold">${product.price}</span>
                  <Button 
                    size="sm"
                    className="bg-gradient-primary hover:opacity-90 text-[10px] px-2 h-6"
                    onClick={() => addToCart(product)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;