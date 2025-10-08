import { useState, useEffect, useRef } from "react";
import { X, Maximize2, Sparkles, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import avatarShowcase from "@/assets/avatar-showcase.png";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";
import { toast } from "sonner";

const AvatarWidget = () => {
  const { isOpen, openModal, closeModal } = useAvatarModal();
  const [processedAvatar, setProcessedAvatar] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: any}>({});
  const [avatarDimensions, setAvatarDimensions] = useState<{width: number, height: number} | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

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

  const handleAddToCart = (item: any) => {
    toast.success(`Added ${item.name} to cart!`);
  };

  const getSelectedItemForCategory = (category: string) => {
    return selectedItems[category] || null;
  };

  // Function to get clothing image URL (using placeholder images for now)
  const getClothingImageUrl = (item: any) => {
    // In a real implementation, these would be actual clothing PNG images
    const clothingImages: {[key: string]: string} = {
      'Leather Jacket': `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2c1810;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 50 L180 50 L190 80 L185 200 L15 200 L10 80 Z" fill="url(#jacketGrad)" stroke="#000" stroke-width="2"/>
          <path d="M20 50 L10 80 L20 100" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M180 50 L190 80 L180 100" fill="none" stroke="#000" stroke-width="2"/>
        </svg>
      `)}`,
      'Designer Sneakers': `data:image/svg+xml;base64,${btoa(`
        <svg width="150" height="80" viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sneakerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#333333;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
            </linearGradient>
          </defs>
          <ellipse cx="75" cy="40" rx="70" ry="35" fill="url(#sneakerGrad)" stroke="#000" stroke-width="2"/>
          <rect x="20" y="25" width="110" height="30" rx="15" fill="#fff" opacity="0.3"/>
        </svg>
      `)}`,
      'Statement Belt': `data:image/svg+xml;base64,${btoa(`
        <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect x="10" y="15" width="100" height="10" rx="5" fill="url(#beltGrad)" stroke="#000" stroke-width="1"/>
          <rect x="50" y="10" width="20" height="20" rx="10" fill="#ffd700"/>
        </svg>
      `)}`,
      'Premium White Tee': `data:image/svg+xml;base64,${btoa(`
        <svg width="180" height="250" viewBox="0 0 180 250" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="teeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M30 40 L150 40 L160 80 L155 200 L25 200 L20 80 Z" fill="url(#teeGrad)" stroke="#000" stroke-width="2"/>
          <path d="M30 40 L20 80 L30 100" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M150 40 L160 80 L150 100" fill="none" stroke="#000" stroke-width="2"/>
        </svg>
      `)}`,
      'Classic Denim': `data:image/svg+xml;base64,${btoa(`
        <svg width="160" height="200" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="denimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4169E1;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1e3a8a;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 20 L140 20 L145 180 L15 180 Z" fill="url(#denimGrad)" stroke="#000" stroke-width="2"/>
          <rect x="30" y="40" width="20" height="30" fill="#fff" opacity="0.3"/>
          <rect x="110" y="40" width="20" height="30" fill="#fff" opacity="0.3"/>
        </svg>
      `)}`,
      'Wool Blazer': `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="280" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M25 45 L175 45 L185 85 L180 250 L20 250 L15 85 Z" fill="url(#blazerGrad)" stroke="#000" stroke-width="2"/>
          <path d="M25 45 L15 85 L25 105" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M175 45 L185 85 L175 105" fill="none" stroke="#000" stroke-width="2"/>
          <rect x="90" y="120" width="20" height="40" fill="#000"/>
        </svg>
      `)}`,
      'Silk Scarf': `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="scarfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ff8e8e;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff6b6b;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 20 L80 20 L85 130 L15 130 Z" fill="url(#scarfGrad)" stroke="#000" stroke-width="1"/>
          <circle cx="50" cy="50" r="5" fill="#fff" opacity="0.5"/>
          <circle cx="50" cy="100" r="5" fill="#fff" opacity="0.5"/>
        </svg>
      `)}`,
      'Leather Boots': `data:image/svg+xml;base64,${btoa(`
        <svg width="140" height="100" viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2c1810;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 20 L120 20 L125 80 L15 80 Z" fill="url(#bootGrad)" stroke="#000" stroke-width="2"/>
          <rect x="30" y="10" width="80" height="20" rx="10" fill="#000"/>
        </svg>
      `)}`,
      'Cashmere Sweater': `data:image/svg+xml;base64,${btoa(`
        <svg width="190" height="260" viewBox="0 0 190 260" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#D2691E;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M25 35 L165 35 L175 75 L170 220 L20 220 L15 75 Z" fill="url(#sweaterGrad)" stroke="#000" stroke-width="2"/>
          <path d="M25 35 L15 75 L25 95" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M165 35 L175 75 L165 95" fill="none" stroke="#000" stroke-width="2"/>
        </svg>
      `)}`,
      'Silk Dress': `data:image/svg+xml;base64,${btoa(`
        <svg width="180" height="300" viewBox="0 0 180 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffb6c1;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff69b4;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M30 30 L150 30 L160 70 L155 280 L25 280 L20 70 Z" fill="url(#dressGrad)" stroke="#000" stroke-width="2"/>
          <path d="M30 30 L20 70 L30 90" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M150 30 L160 70 L150 90" fill="none" stroke="#000" stroke-width="2"/>
        </svg>
      `)}`,
      'Gold Watch': `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="watchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#daa520;stop-opacity:1" />
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="25" fill="url(#watchGrad)" stroke="#000" stroke-width="2"/>
          <circle cx="30" cy="30" r="20" fill="#000"/>
          <line x1="30" y1="30" x2="30" y2="15" stroke="#fff" stroke-width="2"/>
          <line x1="30" y1="30" x2="35" y2="30" stroke="#fff" stroke-width="1"/>
        </svg>
      `)}`,
      'Canvas Sneakers': `data:image/svg+xml;base64,${btoa(`
        <svg width="150" height="80" viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canvasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
            </linearGradient>
          </defs>
          <ellipse cx="75" cy="40" rx="70" ry="35" fill="url(#canvasGrad)" stroke="#000" stroke-width="2"/>
          <rect x="20" y="25" width="110" height="30" rx="15" fill="#000" opacity="0.1"/>
        </svg>
      `)}`,
      'Wool Coat': `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="320" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 30 L180 30 L190 70 L185 300 L15 300 L10 70 Z" fill="url(#coatGrad)" stroke="#000" stroke-width="2"/>
          <path d="M20 30 L10 70 L20 90" fill="none" stroke="#000" stroke-width="2"/>
          <path d="M180 30 L190 70 L180 90" fill="none" stroke="#000" stroke-width="2"/>
        </svg>
      `)}`
    };
    return clothingImages[item.name] || clothingImages['Premium White Tee'];
  };

  // Function to calculate clothing positioning based on avatar dimensions
  const getClothingPosition = (item: any, avatarWidth: number, avatarHeight: number) => {
    const baseWidth = 300; // Base avatar width for calculations
    const baseHeight = 600; // Base avatar height for calculations (full-length)
    
    const scaleX = avatarWidth / baseWidth;
    const scaleY = avatarHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);

    const positions: {[key: string]: any} = {
      'Outerwear': {
        top: avatarHeight * 0.08,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.85 * scale,
        height: avatarHeight * 0.35 * scale,
        zIndex: 3,
        transform: 'translateX(-50%) rotate(-2deg)'
      },
      'Tops': {
        top: avatarHeight * 0.10,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.8 * scale,
        height: avatarHeight * 0.30 * scale,
        zIndex: 2,
        transform: 'translateX(-50%) rotate(1deg)'
      },
      'Bottoms': {
        top: avatarHeight * 0.40,
        left: avatarWidth * 0.5,
        width: avatarWidth * 0.7 * scale,
        height: avatarHeight * 0.45 * scale,
        zIndex: 1,
        transform: 'translateX(-50%) rotate(-1deg)'
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
            {/* Left Column - Full Body Avatar - Touching Left Edge */}
            <div className="flex flex-col justify-center items-start h-full flex-shrink-0 -ml-20">
              <div 
                ref={avatarRef}
                className="relative h-full flex items-center justify-start"
              >
                {/* Full-Body Avatar - Smaller for Symmetry */}
                <img 
                  src={processedAvatar || avatarShowcase} 
                  alt="Your 3D Avatar" 
                  className="h-[90vh] w-auto object-contain object-left"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
                    transition: 'all 0.3s ease-in-out'
                  }}
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

            {/* Right Column - Apparel Items List - Overlapping Avatar */}
            <div className="flex flex-col h-full py-4 pr-4 overflow-hidden flex-1 -ml-40">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg sm:text-2xl font-bold tracking-wide">Mix-Match</h3>
                {Object.keys(selectedItems).length > 0 && (
                  <div className="text-sm text-primary font-medium">
                    {Object.keys(selectedItems).length} item{Object.keys(selectedItems).length > 1 ? 's' : ''} selected
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1 overflow-y-auto pr-2">
                {[
                  { 
                    name: "Black Jeans", 
                    brand: "Gucci", 
                    category: "Bottoms",
                    price: "$450",
                    image: "👖"
                  },
                  { 
                    name: "Gray Jeans", 
                    brand: "Prada", 
                    category: "Bottoms",
                    price: "$380",
                    image: "👖"
                  },
                  { 
                    name: "White Pants", 
                    brand: "Monarch Apparel", 
                    category: "Bottoms",
                    price: "$320",
                    image: "👖"
                  },
                  { 
                    name: "Jean Shorts", 
                    brand: "Gucci", 
                    category: "Bottoms",
                    price: "$290",
                    image: "🩳"
                  },
                  { 
                    name: "White Shorts", 
                    brand: "Prada", 
                    category: "Bottoms",
                    price: "$250",
                    image: "🩳"
                  },
                  { 
                    name: "Red Dress", 
                    brand: "Monarch Apparel", 
                    category: "Dresses",
                    price: "$580",
                    image: "👗"
                  },
                  { 
                    name: "Black Leather Jacket", 
                    brand: "Gucci", 
                    category: "Outerwear",
                    price: "$890",
                    image: "🧥"
                  },
                  { 
                    name: "Black Blazer", 
                    brand: "Prada", 
                    category: "Outerwear",
                    price: "$720",
                    image: "🤵"
                  },
                  { 
                    name: "Blue Shirt", 
                    brand: "Monarch Apparel", 
                    category: "Tops",
                    price: "$180",
                    image: "👔"
                  },
                  { 
                    name: "Green Cardigan", 
                    brand: "Gucci", 
                    category: "Tops",
                    price: "$420",
                    image: "🧶"
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-1.5 sm:p-2 hover:bg-gray-50 transition-all duration-300 cursor-pointer rounded-lg group">
                    <div className="flex flex-col gap-1.5">
                      {/* Emoji and name on same line */}
                      <div className="flex items-center gap-2">
                        <div className="text-xl sm:text-2xl flex-shrink-0">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs tracking-wide group-hover:text-primary transition-colors truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{item.brand}</p>
                        </div>
                        <span className="text-xs font-bold text-primary flex-shrink-0">{item.price}</span>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          onClick={() => handleTryOn(item)}
                          className={`flex-1 h-7 text-xs transition-all duration-300 ${
                            getSelectedItemForCategory(item.category)?.name === item.name
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-gradient-primary hover:opacity-90'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 mr-0.5" />
                          {getSelectedItemForCategory(item.category)?.name === item.name ? 'Remove' : 'Try'}
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          variant="outline"
                          className="h-7 w-7 p-0 border-primary text-primary hover:bg-primary/10 flex-shrink-0"
                        >
                          <ShoppingCart className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 flex gap-2">
                <Button 
                  onClick={() => {
                    setSelectedItems({});
                    toast.success("Cleared all items");
                  }}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Clear All
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
      className="fixed bottom-0 -right-12 z-40 group"
    >
      <div className="relative">
        {/* Full body avatar silhouette - no background */}
        <div className="relative w-40 h-52 sm:w-64 sm:h-80 transition-all hover:scale-105">
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