import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-4">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">AI-Powered Shopping Experience</span>
          </div>
          
          <h1 className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold leading-none text-gray-800 tracking-tighter">
            Monarch
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700">
            Your Personal Style Assistant
          </h2>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover your perfect look with AI-powered recommendations, virtual try-ons, 
            and curated collections from your favorite brands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gray-800 text-white hover:bg-gray-900 transition-opacity shadow-elegant text-lg px-8"
            >
              Start Shopping
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
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