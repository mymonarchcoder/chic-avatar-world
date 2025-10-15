import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
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

// Mock product data
const brandProducts = {
  vuori: {
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
  lululemon: {
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
};

const BrandCollection = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { openModal } = useAvatarModal();
  
  const brandData = brandProducts[brandId as keyof typeof brandProducts];

  const getProductId = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, '-');
  };

  if (!brandData) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Brand not found</h1>
          <Button onClick={() => navigate('/brands')}>Back to Brands</Button>
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
              onClick={() => navigate('/favorite-brands')}
              className="mb-4"
            >
              ← Back to Favorites
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ letterSpacing: '-0.1em' }}>
              {brandData.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {brandData.products.length} items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      BEST SELLER
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{product.colors[0]}</p>
                  <p className="text-xl font-bold mb-4">${product.price}</p>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {product.colors.slice(0, 8).map((color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full ${getColorCircle(color)} cursor-pointer hover:scale-110 transition-transform`}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 8 && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                        +{product.colors.length - 8}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      onClick={openModal}
                    >
                      Try On
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
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
