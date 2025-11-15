import { useState } from "react";
import { Heart, ChevronDown, Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarWidget from "@/components/AvatarWidget";
import aloLogo from "@/assets/alo-logo.png";

const AloDemo = () => {
  const [openFilters, setOpenFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setOpenFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const products = [
    {
      id: 1,
      name: "Faux Fur Trimmed Longline",
      price: 144,
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop",
      colors: ["black"],
      discount: "MEMBERS ONLY 30% OFF"
    },
    {
      id: 2,
      name: "7/8 High-Waist Airlift",
      price: 144,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop",
      colors: ["black", "brown", "navy", "gray", "blue"],
      moreColors: 14,
      discount: "MEMBERS ONLY 30% OFF"
    },
    {
      id: 3,
      name: "Polar Fleece Hazy Pullover",
      price: 134,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
      colors: ["white", "black"],
      discount: "MEMBERS ONLY 30% OFF"
    },
    {
      id: 4,
      name: "Polar Fleece Retreat Shorts",
      price: 134,
      image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&h=800&fit=crop",
      colors: ["white", "black", "blue", "gray"],
      discount: "MEMBERS ONLY 30% OFF"
    }
  ];

  const filters = [
    "PRODUCT TYPE",
    "SIZE", 
    "COLOR",
    "FABRIC",
    "BRA SUPPORT",
    "LENGTH",
    "SHORTS INSEAM",
    "JUST DROPPED"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-30">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img src={aloLogo} alt="alo" className="h-8" />
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">WOMEN</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">MEN</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">SHOES</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">GIFT GUIDE</a>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-xs hidden lg:flex items-center gap-2">
                <User className="w-4 h-4" />
                SIGN IN TO GET REWARDS
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <h2 className="text-lg font-bold mb-6">FILTERS</h2>
            <div className="space-y-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className="w-full flex items-center justify-between py-3 border-b border-border hover:text-primary transition-colors"
                >
                  <span className="text-sm font-medium">{filter}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      openFilters.includes(filter) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group border-none shadow-none overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="pt-4">
                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 mb-3">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded-full border-2 border-border cursor-pointer hover:scale-110 transition-transform ${
                            color === 'black' ? 'bg-black' :
                            color === 'brown' ? 'bg-amber-900' :
                            color === 'navy' ? 'bg-blue-900' :
                            color === 'gray' ? 'bg-gray-500' :
                            color === 'blue' ? 'bg-blue-400' :
                            'bg-white'
                          }`}
                        />
                      ))}
                      {product.moreColors && (
                        <span className="text-xs font-medium">+{product.moreColors}</span>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="mb-2">
                        <span className="text-xs font-bold text-primary">{product.discount}</span>
                      </div>
                    )}

                    {/* Product Info */}
                    <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                    <p className="text-sm font-bold">${product.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Avatar Widget */}
      <AvatarWidget />
    </div>
  );
};

export default AloDemo;
