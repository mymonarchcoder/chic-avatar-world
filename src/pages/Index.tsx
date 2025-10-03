import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AvatarSection from "@/components/AvatarSection";
import BrandProductCarousel from "@/components/BrandProductCarousel";
import ChatAssistant from "@/components/ChatAssistant";
import AvatarWidget from "@/components/AvatarWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AvatarSection />
      <BrandProductCarousel />
      <ChatAssistant />
      <AvatarWidget />
    </div>
  );
};

export default Index;