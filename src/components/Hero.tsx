import { Button } from "./ui/button";
import { Sparkles, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { openModal } = useAvatarModal();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content Section */}
          <div className="w-full px-2 sm:px-4 text-center lg:text-left space-y-2 sm:space-y-1 animate-fade-in pt-4 sm:pt-8">
            <h1 className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none text-primary tracking-tighter font-baloo">
              tuuin
            </h1>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary -mt-1 sm:-mt-2 px-2">
              Your Personal Style
            </h2>
            
            <p className="text-base sm:text-xl text-foreground max-w-2xl lg:max-w-none px-2 sm:px-0">
              Discover your perfect look with AI-powered recommendations, virtual try-ons, 
              and curated collections from your favorite brands.
            </p>
            
            <div className="flex justify-center lg:justify-start pt-2 sm:pt-2">
              <Button 
                size="lg" 
                className="shadow-elegant text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                Top Emerging Brands
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;