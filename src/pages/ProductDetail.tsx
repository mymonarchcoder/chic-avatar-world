import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import haloWidelegPant from "@/assets/halo-wideleg-pant.png";
import performanceJogger from "@/assets/performance-jogger.png";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AvatarWidget from "@/components/AvatarWidget";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import { useToast } from "@/hooks/use-toast";

const productData = {
  "halo-essential-wideleg-pant": {
    id: 1,
    name: "Halo Essential Wideleg Pant",
    brand: "Vuori",
    price: 108,
    description: "The perfect blend of style and comfort. Our Halo Essential Wideleg Pant features a flattering fit with ultimate movement and breathability.",
    features: [
      "Ultra-soft performance fabric",
      "Moisture-wicking technology",
      "4-way stretch for mobility",
      "Flat drawstring waistband",
      "Side pockets",
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black Heather", hex: "#1a1a1a" },
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Olive", hex: "#4a5d3f" },
      { name: "Sand", hex: "#c4a57b" },
      { name: "Grey", hex: "#808080" },
    ],
    image: haloWidelegPant,
    isBestSeller: false,
  },
  "performance-jogger": {
    id: 2,
    name: "Performance Jogger",
    brand: "Vuori",
    price: 94,
    description: "Our best-selling jogger designed for all-day comfort and performance.",
    features: [
      "DreamKnit™ fabric",
      "4-way stretch",
      "Moisture-wicking",
      "Zippered pockets",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black Heather", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Grey", hex: "#808080" },
    ],
    image: performanceJogger,
    isBestSeller: true,
  },
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { openModal } = useAvatarModal();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(0);

  const product = productData[productId as keyof typeof productData];

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/brands')}>Back to Brands</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} - ${product.colors[selectedColor].name} - Size ${selectedSize}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/brand/${product.brand.toLowerCase()}`)}
            className="mb-4"
          >
            ← Back to {product.brand}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-lg">
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
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ letterSpacing: '-0.05em' }}>
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.colors[selectedColor].name}
                </p>
                <p className="text-2xl font-bold">${product.price}</p>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium mb-3">Color</p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === index 
                          ? 'ring-2 ring-primary ring-offset-2' 
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium mb-3">Size</p>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="w-full"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={openModal}
                  >
                    Try On Avatar
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-4 h-4 mr-2 mt-0.5 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
