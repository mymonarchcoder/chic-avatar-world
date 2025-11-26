import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock try-on history data
const mockTryOnHistory = [
  {
    id: 1,
    productName: "Airlift Legging",
    brand: "Alo Yoga",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop&q=80",
    price: 118,
    triedOnAt: "2 hours ago",
    color: "Black",
    size: "M"
  },
  {
    id: 2,
    productName: "Accolade Hoodie",
    brand: "Alo Yoga",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&q=80",
    price: 128,
    triedOnAt: "5 hours ago",
    color: "Olive",
    size: "S"
  },
  {
    id: 3,
    productName: "Condor Pant",
    brand: "Malbon Golf",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80",
    price: 178,
    triedOnAt: "1 day ago",
    color: "Khaki",
    size: "32"
  },
  {
    id: 4,
    productName: "Foraging Windshirt",
    brand: "Malbon Golf",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop&q=80",
    price: 228,
    triedOnAt: "1 day ago",
    color: "Ivory",
    size: "L"
  },
  {
    id: 5,
    productName: "Align High-Rise Pant",
    brand: "Lululemon",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop&q=80",
    price: 98,
    triedOnAt: "2 days ago",
    color: "Black",
    size: "6"
  },
  {
    id: 6,
    productName: "Define Jacket",
    brand: "Lululemon",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=80",
    price: 118,
    triedOnAt: "2 days ago",
    color: "Navy",
    size: "8"
  },
  {
    id: 7,
    productName: "Performance Jogger",
    brand: "Vuori",
    image: "https://images.unsplash.com/photo-1594633313515-afa736043176?w=600&h=800&fit=crop&q=80",
    price: 89,
    triedOnAt: "3 days ago",
    color: "Charcoal",
    size: "M"
  },
  {
    id: 8,
    productName: "Strato Tech Tee",
    brand: "Vuori",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop&q=80",
    price: 68,
    triedOnAt: "3 days ago",
    color: "White",
    size: "L"
  },
  {
    id: 9,
    productName: "Fits Everybody T-Shirt",
    brand: "SKIMS",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop&q=80",
    price: 52,
    triedOnAt: "4 days ago",
    color: "Bone",
    size: "M"
  },
  {
    id: 10,
    productName: "Soft Lounge Pant",
    brand: "SKIMS",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop&q=80",
    price: 78,
    triedOnAt: "4 days ago",
    color: "Clay",
    size: "S"
  },
  {
    id: 11,
    productName: "501 Original Jeans",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop&q=80",
    price: 89.50,
    triedOnAt: "5 days ago",
    color: "Medium Stonewash",
    size: "30x32"
  },
  {
    id: 12,
    productName: "Trucker Jacket",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1543076659-9380cdf10613?w=600&h=800&fit=crop&q=80",
    price: 98,
    triedOnAt: "5 days ago",
    color: "Dark Denim",
    size: "M"
  },
  {
    id: 13,
    productName: "Goddess Legging",
    brand: "Alo Yoga",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80",
    price: 128,
    triedOnAt: "1 week ago",
    color: "Black",
    size: "S"
  },
  {
    id: 14,
    productName: "Soho Pullover",
    brand: "Alo Yoga",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&q=80",
    price: 108,
    triedOnAt: "1 week ago",
    color: "Lavender",
    size: "M"
  },
  {
    id: 15,
    productName: "Bucket Hat",
    brand: "Malbon Golf",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop&q=80",
    price: 68,
    triedOnAt: "1 week ago",
    color: "Black",
    size: "OS"
  },
  {
    id: 16,
    productName: "Wunder Train Tights",
    brand: "Lululemon",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop&q=80",
    price: 98,
    triedOnAt: "1 week ago",
    color: "Black",
    size: "4"
  }
];

const TryOnHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Try-On History</h1>
          <p className="text-muted-foreground">
            View all items you've tried on across all Tuuin partner brands
          </p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Badge variant="outline" className="cursor-pointer">All Brands</Badge>
          <Badge variant="outline" className="cursor-pointer">Alo Yoga</Badge>
          <Badge variant="outline" className="cursor-pointer">Malbon Golf</Badge>
          <Badge variant="outline" className="cursor-pointer">Lululemon</Badge>
          <Badge variant="outline" className="cursor-pointer">Vuori</Badge>
          <Badge variant="outline" className="cursor-pointer">SKIMS</Badge>
          <Badge variant="outline" className="cursor-pointer">Levi's</Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-12">
          {mockTryOnHistory.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-2">
                <div className="aspect-square mb-2 overflow-hidden rounded-md bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground">{item.brand}</p>
                  <h3 className="font-semibold text-xs line-clamp-2">{item.productName}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{item.triedOnAt}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {item.color} • {item.size}
                  </div>
                  <div className="flex gap-1.5 pt-1.5">
                    <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]">
                      <Heart className="w-2.5 h-2.5 mr-0.5" />
                      Save
                    </Button>
                    <Button size="sm" className="flex-1 h-7 text-[10px]">
                      <ShoppingCart className="w-2.5 h-2.5 mr-0.5" />
                      Buy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TryOnHistory;
