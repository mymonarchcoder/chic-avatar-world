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
        <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in">
          <h1 
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tight"
            style={{ 
              background: 'linear-gradient(180deg, hsl(45 80% 70%) 0%, hsl(35 90% 50%) 50%, hsl(45 80% 70%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 0 hsl(35 40% 35%), 0 8px 0 hsl(35 40% 25%), 0 12px 30px hsl(0 0% 0% / 0.5)',
              filter: 'drop-shadow(0 8px 20px hsl(45 70% 50% / 0.2))',
            }}
          >
            TUUIN
          </h1>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide -mt-4 sm:-mt-8"
            style={{ 
              background: 'linear-gradient(180deg, hsl(45 60% 75%) 0%, hsl(35 70% 55%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 0 hsl(35 40% 40%), 0 4px 15px hsl(0 0% 0% / 0.4)',
            }}
          >
            YOUR PERSONAL STYLE
          </h2>
          
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl px-2 sm:px-0 mt-4">
            Discover your perfect look with AI-powered recommendations, virtual try-ons, 
            and curated collections from your favorite brands.
          </p>
          
          <div className="flex justify-center pt-4 sm:pt-6">
            <Button 
              size="lg" 
              className="bg-gradient-gold text-background font-bold text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 shadow-gold hover:opacity-90 transition-opacity border-0"
            >
              Top Emerging Brands
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;