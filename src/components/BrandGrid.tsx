import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import skimsLogo from "@/assets/skims-logo.png";
import vuoriLogo from "@/assets/vuori-logo.png";
import malbonLogo from "@/assets/malbon-logo.png";
import lululemonLogo from "@/assets/lululemon-logo.png";
import aloLogo from "@/assets/alo-logo.png";
import levisLogo from "@/assets/levis-logo.png";

const brands = [
  { id: 1, name: "SKIMS", category: "Premium Fashion", favorited: false, logo: skimsLogo },
  { id: 2, name: "Vuori", category: "Athleisure wear", favorited: true, logo: vuoriLogo },
  { id: 3, name: "Malbon Golf", category: "Athleisure wear", favorited: false, logo: malbonLogo },
  { id: 4, name: "lululemon", category: "Athleisure wear", favorited: true, logo: lululemonLogo },
  { id: 5, name: "Alo", category: "Athleisure wear", favorited: false, logo: aloLogo },
  { id: 6, name: "Levi's", category: "Timeless Jeans", favorited: false, logo: levisLogo },
];

const BrandGrid = () => {
  const { toggleFavoriteBrand, isBrandFavorited } = useFavorites();
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>
            Featured Brands
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Curate your perfect wardrobe from our collection of premium brands
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {brands.map((brand) => (
            <Card 
              key={brand.id} 
              className="group relative overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/1] bg-background flex items-center justify-center p-3">
                {brand.logo && (
                  <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
                )}
              </div>
              
              <div className="p-2.5">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs font-semibold mb-0.5" style={{ letterSpacing: '-0.1em' }}>{brand.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{brand.category}</p>
                  </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className={`h-7 w-7 ${isBrandFavorited(brand.id) ? "text-yellow-500 hover:text-yellow-600" : ""}`}
                  onClick={() => toggleFavoriteBrand(brand)}
                >
                  <Star className={`w-3.5 h-3.5 ${isBrandFavorited(brand.id) ? "fill-yellow-500" : ""}`} />
                </Button>
                </div>
                
                <Button 
                  size="sm"
                  className="w-full mt-2 bg-muted text-background hover:bg-muted/80 text-[10px] py-1.5 h-7"
                  onClick={() => navigate(`/brand/${brand.id}`)}
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