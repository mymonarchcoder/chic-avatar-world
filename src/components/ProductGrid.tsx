import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const products = [
  { id: 1, name: "Classic White Tee", brand: "Essential", price: 49, image: "" },
  { id: 2, name: "Black Tailored Pants", brand: "Elegant", price: 129, image: "" },
  { id: 3, name: "Designer Sunglasses", brand: "Cool", price: 179, image: "" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.1em' }}>
            Style It With
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your look with these perfectly paired pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 h-10 w-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6">
                <h3 className="text-4xl font-bold mb-6" style={{ letterSpacing: '-0.1em' }}>{product.brand}</h3>
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6"
                  onClick={() => addToCart(product)}
                >
                  Shop the Look
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;