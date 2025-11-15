import { useState } from "react";
import { Heart, ChevronDown, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AvatarWidget from "@/components/AvatarWidget";
import aloLogo from "@/assets/alo-logo.png";

const AloDemo = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-[#5c3d31] text-white text-center py-2 text-xs sm:text-sm">
        FREE 2-DAY SHIPPING + 30% OFF ✨{" "}
        <button 
          onClick={() => setShowSignup(true)}
          className="underline hover:opacity-80 transition-opacity ml-1"
        >
          JOIN TO UNLOCK
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <img src={aloLogo} alt="alo" className="h-7 sm:h-8" />
            
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">WOMEN</a>
              <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">MEN</a>
              <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">SHOES</a>
              <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">GIFT GUIDE</a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="ghost" 
                className="text-[10px] sm:text-xs hidden lg:flex items-center gap-2 hover:bg-transparent underline"
                onClick={() => setShowSignup(true)}
              >
                <User className="w-4 h-4" />
                SIGN IN TO GET REWARDS
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center">
          <div className="text-center px-4">
            <div className="mb-4 text-xs sm:text-sm font-medium text-gray-600">ENDING SOON</div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">SINGLES DAY</h1>
            <p className="text-xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
              <span className="font-bold">30% OFF</span> sitewide
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">EXCLUSIVELY FOR MEMBERS</p>
            <Button 
              onClick={() => setShowSignup(true)}
              className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
            >
              JOIN NOW TO SHOP
            </Button>
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">TRENDING NOW</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { name: "Matching Sets", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop" },
            { name: "Outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop" },
            { name: "Sweatshirts", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop" },
            { name: "Leggings", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop" }
          ].map((item, idx) => (
            <Card key={idx} className="group border-none shadow-none overflow-hidden cursor-pointer">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-3 sm:pt-4 text-center">
                <h3 className="font-semibold text-sm sm:text-base">{item.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-gray-50">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Finishing Touches</h2>
          <a href="#" className="text-xs sm:text-sm underline hover:text-gray-600">Shop Accessories</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { 
              name: "Notable Beanie", 
              price: 78,
              image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=500&fit=crop",
              discount: true
            },
            { 
              name: "Warm Ribbed Gloves", 
              price: 48,
              image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=500&fit=crop",
              discount: true
            },
            { 
              name: "Cozy Socks 3-Pack", 
              price: 36,
              image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=500&fit=crop",
              discount: true
            },
            { 
              name: "Sport Gym Bag", 
              price: 128,
              image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
              discount: true
            }
          ].map((product, idx) => (
            <Card key={idx} className="group border-none shadow-none overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="pt-3 sm:pt-4">
                {product.discount && (
                  <div className="mb-2">
                    <span className="text-[10px] sm:text-xs font-bold text-gray-700">MEMBERS ONLY 30% OFF</span>
                  </div>
                )}
                <h3 className="font-medium text-xs sm:text-sm mb-1">{product.name}</h3>
                <p className="text-sm sm:text-base font-bold">${product.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Signup Modal */}
      <Dialog open={showSignup} onOpenChange={setShowSignup}>
        <DialogContent className="max-w-md bg-white p-0">
          <div className="bg-[#5c3d31] text-white p-6 text-center relative">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 text-white hover:opacity-80"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-xs mb-2">ENDING SOON</div>
            <h2 className="text-3xl font-bold mb-2">SINGLES DAY</h2>
            <p className="text-xl mb-2"><span className="font-bold">30% OFF</span> sitewide</p>
            <p className="text-xs mb-4">EXCLUSIVELY FOR MEMBERS</p>
            <p className="text-sm font-medium">JOIN NOW TO SHOP</p>
          </div>
          
          <div className="p-6">
            <div className="flex gap-4 mb-6 border-b">
              <button className="pb-3 border-b-2 border-black font-medium text-sm">JOIN NOW</button>
              <button className="pb-3 text-sm text-gray-600">SIGN IN</button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <div>
                <label className="text-xs text-gray-600 mb-2 block">Enter Your Birthday</label>
                <input
                  type="text"
                  placeholder="MM/DD (optional)"
                  className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <Button className="w-full bg-gray-300 hover:bg-gray-400 text-black py-3">
                JOIN NOW
              </Button>
              <p className="text-xs text-center text-gray-600">
                By joining, you agree to our <a href="#" className="underline">Terms of Service</a> and to receive email and mobile marketing messages from ALO.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Avatar Widget - positioned at bottom right */}
      <AvatarWidget />
    </div>
  );
};

export default AloDemo;
