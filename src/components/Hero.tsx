import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  const { openModal } = useAvatarModal();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <div className="w-full px-4 text-center space-y-1 animate-fade-in pt-8">
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] font-bold leading-none text-gray-800 tracking-tighter">
            VERS
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 -mt-2">
            Your Personal Style
          </h2>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">AI-Powered Shopping Experience</span>
          </div>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto -mt-1">
            Discover your perfect look with AI-powered recommendations, virtual try-ons, 
            and curated collections from your favorite brands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button 
              size="lg" 
              className="bg-gray-800 text-white hover:bg-gray-900 transition-opacity shadow-elegant text-lg px-8"
            >
              Start Shopping
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={openModal}
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800/10 text-lg px-8"
            >
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;