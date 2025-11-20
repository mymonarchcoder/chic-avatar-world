import { useState, useEffect, useRef } from "react";
import { X, Maximize2, Sparkles, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import { useLocation } from "react-router-dom";
import avatarShowcase from "@/assets/avatar-showcase.png";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";
import { toast } from "sonner";
import AnimatedAvatar from "./AnimatedAvatar";
import { malbonProducts } from "@/data/malbonProducts";
import { aloProducts } from "@/data/aloProducts";

const AvatarWidget = () => {
  const { isOpen, openModal, closeModal } = useAvatarModal();
  const location = useLocation();
  const [processedAvatar, setProcessedAvatar] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: any}>({});
  const [avatarDimensions, setAvatarDimensions] = useState<{width: number, height: number} | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Determine which products to show based on current route
  const isAloDemo = location.pathname === '/alo-demo';
  const products = isAloDemo ? aloProducts : malbonProducts;
  const brandName = isAloDemo ? "Alo Yoga" : "Malbon Golf";

  useEffect(() => {
    const processImage = async () => {
      try {
        const img = await loadImage(avatarShowcase);
        const result = await removeBackground(img);
        setProcessedAvatar(result);
      } catch (error) {
        console.error('Failed to process avatar:', error);
        setProcessedAvatar(avatarShowcase);
      }
    };
    processImage();
  }, []);

  // Track avatar dimensions for responsive clothing positioning
  useEffect(() => {
    const updateDimensions = () => {
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const dimensions = {
          width: rect.width,
          height: rect.height
        };
        setAvatarDimensions(dimensions);
      }
    };

    // Use a small delay to ensure the avatar is rendered
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isOpen]);

  const handleTryOn = (item: any) => {
    // Skip outerwear items - don't allow try-on
    if (item.category === 'outerwear') {
      toast.info(`${item.name} try-on coming soon!`);
      return;
    }
    
    const currentItem = selectedItems[item.category];
    if (currentItem && currentItem.name === item.name) {
      // If the same item is already selected, remove it with fade-out animation
      setIsRemoving(item.category);
      setTimeout(() => {
        setSelectedItems(prev => {
          const newItems = { ...prev };
          delete newItems[item.category];
          return newItems;
        });
        setIsRemoving(null);
      }, 300); // Match the fade-out duration
      toast.success(`Removed ${item.name}`);
    } else {
      // Otherwise, select this item (try on)
      setSelectedItems(prev => ({
        ...prev,
        [item.category]: item
      }));
      toast.success(`Trying on ${item.name}`);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleAddToCart = (item: any) => {
    toast.success(`Added ${item.name} to cart!`);
  };

  const getSelectedItemForCategory = (category: string) => {
    return selectedItems[category] || null;
  };

  // Function to get clothing image URL - now uses actual product images
  const getClothingImageUrl = (item: any) => {
    // Use the actual product image with transparent background if available
    // For now, return the product image directly - in production, you'd want
    // to use pre-processed transparent PNG versions of these images
    return item.image;
  };

  // Function to calculate clothing positioning based on avatar dimensions
  const getClothingPosition = (item: any, avatarWidth: number, avatarHeight: number) => {
    const baseWidth = 300; // Base avatar width for calculations
    const baseHeight = 600; // Base avatar height for calculations (full-length)
    
    const scaleX = avatarWidth / baseWidth;
    const scaleY = avatarHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);

    const positions: {[key: string]: any} = {
      'outerwear': {
        top: avatarHeight * 0.12,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.85,
        height: avatarHeight * 0.50,
        zIndex: 5,
        transform: 'translateX(-50%)'
      },
      'tops': {
        top: avatarHeight * 0.18,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.60,
        height: avatarHeight * 0.35,
        zIndex: 2,
        transform: 'translateX(-50%)'
      },
      'bottoms': {
        top: avatarHeight * 0.48,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.55,
        height: avatarHeight * 0.42,
        zIndex: 1,
        transform: 'translateX(-50%)'
      },
      'Footwear': {
        top: avatarHeight * 0.85,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.6 * scale,
        height: avatarHeight * 0.12 * scale,
        zIndex: 1,
        transform: 'translateX(-50%) rotate(2deg)'
      },
      'Accessories': {
        top: avatarHeight * 0.20,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.3 * scale,
        height: avatarHeight * 0.15 * scale,
        zIndex: 4,
        transform: 'translateX(-50%) rotate(-3deg)'
      },
      'Dresses': {
        top: avatarHeight * 0.08,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.8 * scale,
        height: avatarHeight * 0.80 * scale,
        zIndex: 2,
        transform: 'translateX(-50%) rotate(1deg)'
      }
    };

    return positions[item.category] || positions['Tops'];
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center animate-fade-in">
        <div className="w-full h-full max-w-7xl flex flex-col overflow-hidden animate-scale-in relative">
          {/* Floating Close Button */}
          <Button
            onClick={closeModal}
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background text-foreground hover:text-foreground rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Content - Two Column Layout Always Side by Side */}
          <div className="h-full flex overflow-hidden relative">
            {/* Left Column - Full Body Avatar */}
            <div className="flex flex-col justify-center items-center h-full flex-shrink-0 w-[45%] overflow-visible py-4">
              <div 
                ref={avatarRef}
                className="relative flex items-center justify-center overflow-visible h-full w-full scale-[1.8]"
              >
                {/* Animated Avatar */}
                <AnimatedAvatar
                  src={processedAvatar || avatarShowcase}
                  rotation={rotation}
                  isDragging={isDragging}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
                
                {/* Virtual Try-On Clothing Images */}
                {avatarDimensions && Object.values(selectedItems).map((item: any, index) => {
                  const position = getClothingPosition(item, avatarDimensions.width, avatarDimensions.height);
                  const isCurrentlyRemoving = isRemoving === item.category;
                  
                  return (
                    <img
                      key={`${item.category}-${index}`}
                      src={getClothingImageUrl(item)}
                      alt={item.name}
                      className="absolute pointer-events-none object-contain"
                      style={{
                        ...position,
                        opacity: isCurrentlyRemoving ? 0 : 1,
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right Column - Brand Products */}
            <div className="flex flex-col h-full py-4 pr-4 pl-2 overflow-hidden flex-1 bg-background/95 backdrop-blur-sm rounded-l-lg shadow-lg min-h-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg sm:text-2xl font-bold tracking-wide">{brandName}</h3>
                {Object.keys(selectedItems).length > 0 && (
                  <div className="text-sm text-primary font-medium">
                    {Object.keys(selectedItems).length} item{Object.keys(selectedItems).length > 1 ? 's' : ''} selected
                  </div>
                )}
              </div>
              
              <ScrollArea className="flex-1 pr-2">
                <div className="space-y-1">
                {products.map((item, idx) => (
                  <div key={idx} className="p-1.5 sm:p-2 hover:bg-gray-50 transition-all duration-300 cursor-pointer rounded-lg group">
                    <div className="flex flex-col gap-1.5">
                      {/* Product Image and Details */}
                      <div className="flex items-center gap-2 pr-3 pl-3">
                        <div className="flex-shrink-0 w-16 h-16">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="min-w-0 mr-1 flex-1">
                          <h4 className="font-semibold text-xs tracking-wide group-hover:text-primary transition-colors truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{item.brand}</p>
                        </div>
                        <span className="text-[10px] font-bold text-primary flex-shrink-0 whitespace-nowrap">${item.price}</span>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex gap-2 justify-center px-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleTryOn(item)}
                          className={`h-8 text-sm font-semibold transition-all duration-300 px-4 flex-1 ${
                            getSelectedItemForCategory(item.category)?.name === item.name
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          }`}
                        >
                          {getSelectedItemForCategory(item.category)?.name === item.name ? 'Remove' : 'Try On'}
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          className="h-8 w-10 p-0 bg-primary/10 hover:bg-primary/20 border border-primary text-primary flex-shrink-0"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
              
              <div className="mt-3 flex gap-2">
                <Button 
                  onClick={() => {
                    setSelectedItems({});
                    toast.success("Cleared all items");
                  }}
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-xs"
                >
                  Take Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={openModal}
      className="fixed bottom-0 -right-6 z-40 group"
    >
      <div className="relative">
        {/* Full body avatar silhouette - no background */}
        <div className="relative w-48 h-72 sm:w-72 sm:h-96 transition-all hover:scale-105">
          {processedAvatar ? (
            <img 
              src={processedAvatar} 
              alt="Your 3D Avatar" 
              className="w-full h-full object-contain"
              style={{ 
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse text-primary">Loading...</div>
            </div>
          )}
        </div>
        
        <div className="absolute top-4 right-2 bg-gradient-primary text-primary-foreground rounded-full p-2 shadow-lg animate-pulse">
          <Maximize2 className="w-4 h-4" />
        </div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-primary shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <span className="text-xs font-medium text-primary">Virtual Try-On</span>
        </div>
      </div>
    </button>
  );
};

export default AvatarWidget;