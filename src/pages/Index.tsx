import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandGrid from "@/components/BrandGrid";
import AvatarSection from "@/components/AvatarSection";
import ProductGrid from "@/components/ProductGrid";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <BrandGrid />
      <AvatarSection />
      <ProductGrid />
      <ChatAssistant />
    </div>
  );
};

export default Index;