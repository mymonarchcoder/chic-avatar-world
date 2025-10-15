import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandGrid from "@/components/BrandGrid";
import ChatAssistant from "@/components/ChatAssistant";
import AvatarWidget from "@/components/AvatarWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <BrandGrid />
      <ChatAssistant />
      <AvatarWidget />
    </div>
  );
};

export default Index;