import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const products = [
  { id: 1, name: "Leather Jacket", brand: "Luxury Co", price: 599, image: "" },
  { id: 2, name: "Designer Sneakers", brand: "Urban", price: 249, image: "" },
  { id: 3, name: "Tailored Suit", brand: "Elegant", price: 899, image: "" },
  { id: 4, name: "Performance Hoodie", brand: "Active", price: 129, image: "" },
  { id: 5, name: "Casual Denim", brand: "Comfort", price: 179, image: "" },
  { id: 6, name: "Statement Dress", brand: "Trend", price: 449, image: "" },
  { id: 7, name: "Classic Blazer", brand: "Elite", price: 399, image: "" },
  { id: 8, name: "Running Shoes", brand: "Sport", price: 189, image: "" },
  { id: 9, name: "Silk Blouse", brand: "Chic", price: 229, image: "" },
  { id: 10, name: "Bomber Jacket", brand: "Street", price: 349, image: "" },
  { id: 11, name: "Yoga Pants", brand: "Flex", price: 89, image: "" },
  { id: 12, name: "Trench Coat", brand: "Classic", price: 549, image: "" },
  { id: 13, name: "Chelsea Boots", brand: "Premium", price: 299, image: "" },
  { id: 14, name: "Knit Sweater", brand: "Cozy", price: 159, image: "" },
  { id: 15, name: "Cargo Pants", brand: "Utility", price: 139, image: "" },
  { id: 16, name: "Polo Shirt", brand: "Preppy", price: 79, image: "" },
  { id: 17, name: "Maxi Skirt", brand: "Boho", price: 119, image: "" },
  { id: 18, name: "Puffer Vest", brand: "Outdoor", price: 169, image: "" },
  { id: 19, name: "Loafers", brand: "Refined", price: 219, image: "" },
  { id: 20, name: "Midi Dress", brand: "Feminine", price: 279, image: "" },
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
              
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                <h3 className="text-sm font-semibold mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button 
                    size="sm"
                    className="bg-gradient-primary hover:opacity-90 text-xs px-3"
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