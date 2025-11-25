import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Scan } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AvatarWidget from "@/components/AvatarWidget";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const productData = {
  name: "Condor Coolcore Pant",
  brand: "Malbon",
  price: 158,
  description: "Our Condor Pant features a clean straight-leg silhouette, classic slant pockets, and elevated construction throughout. Tailored in Coolcore® fabric, it's finished with signature Malbon branding for a standout look that delivers polish with a laid-back edge.",
  features: [
    "Fabrication: 73% polyester 20% cotton 7% elastane",
    "Coolcore® fabric",
    "Zipper fly closure",
    "Front and back pockets",
    "Elastic waistband",
    "Embroidered Malbon script logo on back",
    "30\" inseam",
  ],
  sizes: ["XS (28)", "S (30)", "M (32)", "L (34)", "XL (36)", "XXL (38)"],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1e3a5f" },
  ],
  images: [
    "https://malbon.com/cdn/shop/files/M-9408-NVY_revised_1.png?crop=center&height=2560&v=1756838592&width=720",
    "https://malbon.com/cdn/shop/files/M-9408-NVY.jpg?crop=center&height=2560&v=1756838592&width=720",
    "https://malbon.com/cdn/shop/files/M-9408-NVY1.jpg?crop=center&height=2560&v=1756838592&width=720",
    "https://malbon.com/cdn/shop/files/M-9408-NVY2.jpg?crop=center&height=2560&v=1756838592&width=720",
  ],
  modelInfo: "Chris is 6'0\" and wearing a size L.",
  productUrl: "https://malbon.com/products/condor-coolcore-pant-navy",
};

const MalbonCondorPant = () => {
  const navigate = useNavigate();
  const { openModal } = useAvatarModal();
  const { toast } = useToast();
  const { refreshCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(1); // Default to Navy
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to add items to cart",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: 'condor-coolcore-pant',
          product_name: productData.name,
          product_brand: productData.brand,
          product_price: productData.price,
          quantity: 1,
          size: selectedSize,
          color: productData.colors[selectedColor].name,
        });

      if (error) throw error;

      refreshCart();
      
      toast({
        title: "Added to cart",
        description: `${productData.name} - ${productData.colors[selectedColor].name} - Size ${selectedSize}`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/brand/malbon')}
            className="mb-4"
          >
            ← Back to Malbon
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-lg">
                <img 
                  src={productData.images[currentImageIndex]}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{productData.brand}</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ letterSpacing: '-0.05em' }}>
                  {productData.name}
                </h1>
                <p className="text-2xl font-bold">${productData.price}</p>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium mb-3">Color: {productData.colors[selectedColor].name.toUpperCase()}</p>
                <div className="flex gap-3 flex-wrap">
                  {productData.colors.map((color, index) => (
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

              {/* Model Info and Try On Button */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">{productData.modelInfo}</p>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={openModal}
                    className="shrink-0 bg-background hover:bg-accent"
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Try On
                  </Button>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium mb-3">Select a Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {productData.sizes.map((size) => (
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
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Save to Favorites
                </Button>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <p className="text-muted-foreground mb-4">{productData.description}</p>
                <ul className="space-y-2">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-4 h-4 mr-2 mt-0.5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link to Original Product */}
              <div className="pt-4 border-t">
                <a 
                  href={productData.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View on Malbon.com →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalbonCondorPant;
