import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const products = [
  { id: 1, name: "Premium Leather Jacket", brand: "Luxury Brand Co", price: 599, image: "" },
  { id: 2, name: "Designer Sneakers", brand: "Urban Style", price: 249, image: "" },
  { id: 3, name: "Tailored Suit", brand: "Elegant Threads", price: 899, image: "" },
  { id: 4, name: "Performance Hoodie", brand: "Active Life", price: 129, image: "" },
  { id: 5, name: "Casual Denim", brand: "Casual Comfort", price: 179, image: "" },
  { id: 6, name: "Statement Dress", brand: "Trend Setters", price: 449, image: "" },
];

const ProductGrid = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Button size="icon" className="bg-gradient-primary hover:opacity-90">
                    <ShoppingBag className="w-5 h-5" />
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