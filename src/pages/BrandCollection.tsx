import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import haloWidelegPant from "@/assets/halo-wideleg-pant.png";
import performanceJogger from "@/assets/performance-jogger.png";
import dailyLegging from "@/assets/daily-legging-skyblue.png";
import metaPant from "@/assets/meta-pant.png";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AvatarWidget from "@/components/AvatarWidget";
import { useAvatarModal } from "@/contexts/AvatarModalContext";

// Map brand IDs to brand data
const brandDataMap: Record<string, { name: string; products: any[] }> = {
  "1": {
    name: "SKIMS",
    products: [],
  },
  "2": {
    name: "Vuori",
    products: [
      {
        id: 1,
        name: "Halo Essential Wideleg Pant",
        price: 108,
        image: haloWidelegPant,
        colors: ["Black Heather", "Charcoal", "Navy", "Olive", "Sand"],
        isBestSeller: false,
      },
      {
        id: 2,
        name: "Performance Jogger",
        price: 94,
        image: performanceJogger,
        colors: ["Black Heather", "Navy", "Charcoal", "Grey", "Blue", "Teal", "Olive", "Brown", "Plum"],
        isBestSeller: true,
      },
      {
        id: 3,
        name: "Daily Legging",
        price: 78,
        image: dailyLegging,
        colors: ["Sky Blue", "Navy", "Charcoal", "Olive"],
        isBestSeller: false,
      },
      {
        id: 4,
        name: "Meta Pant",
        price: 118,
        image: metaPant,
        colors: ["Black", "Navy", "Charcoal", "Sand"],
        isBestSeller: true,
      },
    ],
  },
  "3": {
    name: "Malbon Golf",
    products: [],
  },
  "4": {
    name: "lululemon",
    products: [
      {
        id: 5,
        name: "Align High-Rise Pant",
        price: 98,
        image: "/placeholder.svg",
        colors: ["Black", "Navy", "Grey", "Pink"],
        isBestSeller: true,
      },
      {
        id: 6,
        name: "Scuba Oversized Hoodie",
        price: 118,
        image: "/placeholder.svg",
        colors: ["Black", "White", "Grey", "Navy"],
        isBestSeller: false,
      },
    ],
  },
  "5": {
    name: "Alo",
    products: [],
  },
  "6": {
    name: "Levi's",
    products: [],
  },
};

const BrandCollection = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { openModal } = useAvatarModal();
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  
  const brandData = brandDataMap[brandId || ""];

  const getProductId = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, '-');
  };

  const isFavorited = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const toggleFavorite = (product: typeof brandData.products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFavorited(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        brand: brandData.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  if (!brandData || brandData.products.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">{brandData ? `${brandData.name} - Coming Soon` : 'Brand not found'}</h1>
          <p className="text-muted-foreground mb-4">
            {brandData ? 'Products will be available soon!' : 'This brand does not exist.'}
          </p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const getColorCircle = (color: string) => {
    const colorMap: Record<string, string> = {
      "Black": "bg-black",
      "Black Heather": "bg-gray-900",
      "Charcoal": "bg-gray-700",
      "Navy": "bg-blue-900",
      "Olive": "bg-green-900",
      "Sand": "bg-amber-200",
      "Grey": "bg-gray-500",
      "Blue": "bg-blue-600",
      "Teal": "bg-teal-600",
      "Brown": "bg-amber-800",
      "Plum": "bg-purple-900",
      "White": "bg-white border border-gray-300",
      "Pink": "bg-pink-400",
      "Sky Blue": "bg-sky-300",
    };
    return colorMap[color] || "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>
              {brandData.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {brandData.products.length} items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandData.products.map((product) => (
              <Card 
                key={product.id}
                className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${getProductId(product.name)}`)}
              >
                <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isBestSeller && (
                    <Badge className="absolute top-2 left-2 text-xs bg-primary text-primary-foreground">
                      BEST SELLER
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background ${
                      isFavorited(product.id) ? 'text-primary' : ''
                    }`}
                    onClick={(e) => toggleFavorite(product, e)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        isFavorited(product.id) ? 'fill-current' : ''
                      }`} 
                    />
                  </Button>
                </div>
                
                <div className="p-3">
                  <h3 className="text-xs font-semibold mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-muted-foreground text-[10px] mb-1.5">{product.colors[0]}</p>
                  <p className="text-sm font-bold mb-2">${product.price}</p>
                  
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {product.colors.slice(0, 6).map((color, index) => (
                      <div
                        key={index}
                        className={`w-5 h-5 rounded-full ${getColorCircle(color)} cursor-pointer hover:scale-110 transition-transform`}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 6 && (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[9px]">
                        +{product.colors.length - 6}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={openModal}
                    >
                      Try On
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCollection;
