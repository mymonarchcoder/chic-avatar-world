import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import aloLogo from "@/assets/alo-logo.png";
import malbonLogo from "@/assets/malbon-logo.png";
import lululemonLogo from "@/assets/lululemon-logo.png";
import vuoriLogo from "@/assets/vuori-logo.png";
import skimsLogo from "@/assets/skims-logo.png";
import levisLogo from "@/assets/levis-logo.png";

const VirtualFittingRoom = () => {
  const navigate = useNavigate();

  const fittingRooms = [
    {
      id: "alo",
      name: "Alo Yoga",
      description: "Experience athleisure perfection with our virtual fitting room",
      logo: aloLogo,
      route: "/alo-demo",
      featured: true,
    },
    {
      id: "malbon",
      name: "Malbon Golf",
      description: "Try on premium golf apparel virtually",
      logo: malbonLogo,
      route: "/malbon-demo",
      featured: true,
    },
    {
      id: "lululemon",
      name: "Lululemon",
      description: "Virtual try-on for performance wear",
      logo: lululemonLogo,
      route: "/brands/lululemon",
      featured: false,
    },
    {
      id: "vuori",
      name: "Vuori",
      description: "See how Vuori's versatile pieces fit you",
      logo: vuoriLogo,
      route: "/brands/vuori",
      featured: false,
    },
    {
      id: "skims",
      name: "SKIMS",
      description: "Virtual fitting for body-positive essentials",
      logo: skimsLogo,
      route: "/brands/skims",
      featured: false,
    },
    {
      id: "levis",
      name: "Levi's",
      description: "Try on iconic denim virtually",
      logo: levisLogo,
      route: "/brands/levis",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Scan className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Virtual Fitting Rooms</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Try on clothes from your favorite brands using your personalized avatar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {fittingRooms.map((room) => (
            <Card 
              key={room.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(room.route)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <img 
                    src={room.logo} 
                    alt={`${room.name} logo`}
                    className="h-12 object-contain"
                  />
                  {room.featured && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl">{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full group-hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(room.route);
                  }}
                >
                  <Scan className="w-4 h-4 mr-2" />
                  Enter Fitting Room
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2">Don't have an avatar yet?</h2>
          <p className="text-muted-foreground mb-4">
            Create your personalized 3D avatar to start trying on clothes
          </p>
          <Button onClick={() => navigate("/avatar-generation")} variant="outline">
            Create Your Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualFittingRoom;
