import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const brands = [
  { id: 1, name: "Luxury Brand Co", category: "Premium Fashion", favorited: false },
  { id: 2, name: "Urban Style", category: "Streetwear", favorited: true },
  { id: 3, name: "Elegant Threads", category: "Formal Wear", favorited: false },
  { id: 4, name: "Active Life", category: "Sportswear", favorited: true },
  { id: 5, name: "Casual Comfort", category: "Everyday Style", favorited: false },
  { id: 6, name: "Trend Setters", category: "High Fashion", favorited: false },
  { id: 7, name: "Designer Edge", category: "Contemporary", favorited: false },
  { id: 8, name: "Classic Style", category: "Timeless Wear", favorited: true },
  { id: 9, name: "Modern Essentials", category: "Minimalist", favorited: false },
  { id: 10, name: "Bold Fashion", category: "Statement Pieces", favorited: false },
  { id: 11, name: "Eco Wear", category: "Sustainable", favorited: true },
  { id: 12, name: "Heritage Co", category: "Classic American", favorited: false },
];

const BrandGrid = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.1em' }}>
            Featured Brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curate your perfect wardrobe from our collection of premium brands
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <Card 
              key={brand.id} 
              className="group relative overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gradient-primary opacity-10 group-hover:opacity-20 transition-opacity" />
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold mb-1">{brand.name}</h3>
                    <p className="text-xs text-muted-foreground">{brand.category}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={brand.favorited ? "text-primary" : ""}
                  >
                    <Heart className={`w-5 h-5 ${brand.favorited ? "fill-current" : ""}`} />
                  </Button>
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
    </section>
  );
};

export default BrandGrid;