import { useState } from "react";
import { X, Maximize2, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import avatarShowcase from "@/assets/avatar-showcase.png";

const AvatarWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-6xl h-[90vh] shadow-elegant overflow-hidden animate-scale-in">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b bg-gradient-primary text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    3D Virtual Try-On Studio
                  </h2>
                  <p className="text-sm opacity-90 mt-1">Rotate and interact with your personalized 3D avatar</p>
                </div>
                <Button
                  onClick={() => setIsExpanded(false)}
                  size="icon"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid md:grid-cols-2 gap-8 h-full">
                {/* 3D Avatar Display */}
                <div className="flex flex-col">
                  <div className="flex-1 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center p-8 relative overflow-hidden">
                    {/* 3D Stage Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                    
                    {/* Rotating Platform Effect */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-4 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full blur-sm" />
                    
                    {/* Avatar with 3D Transform */}
                    <div 
                      className="relative perspective-1000 transform-gpu transition-transform duration-500 hover:scale-105"
                      style={{ perspective: '1000px' }}
                    >
                      <img 
                        src={avatarShowcase} 
                        alt="Your 3D Avatar" 
                        className="max-h-[600px] object-contain rounded-lg shadow-elegant transform-gpu transition-all duration-700 hover:rotate-y-6"
                        style={{ 
                          transformStyle: 'preserve-3d',
                          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))'
                        }}
                      />
                      {/* 3D Lighting Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg pointer-events-none" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Change Outfit
                    </Button>
                    <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10">
                      Rotate 360°
                    </Button>
                  </div>
                </div>

                {/* Item Selection */}
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-4">Available Items</h3>
                  <div className="flex-1 space-y-3 overflow-auto">
                    {[
                      { name: "Premium White Tee", brand: "Luxury Brand Co", category: "Tops" },
                      { name: "Classic Denim", brand: "Urban Style", category: "Bottoms" },
                      { name: "Leather Jacket", brand: "Elegant Threads", category: "Outerwear" },
                      { name: "Designer Sneakers", brand: "Active Life", category: "Footwear" },
                      { name: "Statement Belt", brand: "Trend Setters", category: "Accessories" },
                    ].map((item, idx) => (
                      <Card key={idx} className="p-4 hover:shadow-card transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <p className="text-xs text-primary mt-1">{item.category}</p>
                          </div>
                          <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                            Try On
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-muted/30">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  AI-powered size recommendations available
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsExpanded(true)}
      className="fixed bottom-24 right-6 z-40 group"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-elegant hover:shadow-xl transition-all hover:scale-110 bg-gradient-to-br from-primary/10 to-accent/5">
          <img 
            src={avatarShowcase} 
            alt="Your Avatar" 
            className="w-full h-full object-cover object-top scale-125"
            style={{ objectPosition: 'center 15%' }}
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-gradient-primary text-primary-foreground rounded-full p-1.5 shadow-lg animate-pulse">
          <Maximize2 className="w-3 h-3" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-primary shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <span className="text-xs font-medium text-primary">Virtual Try-On</span>
        </div>
      </div>
    </button>
  );
};

export default AvatarWidget;