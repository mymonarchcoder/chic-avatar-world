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
    image: "https://cdn.shopify.com/s/files/1/1464/5034/files/02_f48e8afd-934d-41f3-a5bb-d1da17d63061.jpg",
    price: 118,
    triedOnAt: "2 hours ago",
    color: "Black",
    size: "M"
  },
  {
    id: 2,
    productName: "Accolade Hoodie",
    brand: "Alo Yoga",
    image: "https://cdn.shopify.com/s/files/1/1464/5034/files/W5534R_338_1.jpg",
    price: 128,
    triedOnAt: "5 hours ago",
    color: "Olive",
    size: "S"
  },
  {
    id: 3,
    productName: "Condor Pant",
    brand: "Malbon Golf",
    image: "https://malbon.com/cdn/shop/files/1_2ec93ef7-42ff-4ccd-acdb-faa2d7e67cda.png",
    price: 178,
    triedOnAt: "1 day ago",
    color: "Khaki",
    size: "32"
  },
  {
    id: 4,
    productName: "Foraging Windshirt",
    brand: "Malbon Golf",
    image: "https://malbon.com/cdn/shop/files/M-9717-IVY_22c610c1-0ff8-4736-8377-90d3a25b0d4c.png",
    price: 228,
    triedOnAt: "1 day ago",
    color: "Ivory",
    size: "L"
  },
  {
    id: 5,
    productName: "Align High-Rise Pant",
    brand: "Lululemon",
    image: "https://images.lululemon.com/is/image/lululemon/LW5CWQS_0001_1",
    price: 98,
    triedOnAt: "2 days ago",
    color: "Black",
    size: "6"
  },
  {
    id: 6,
    productName: "Define Jacket",
    brand: "Lululemon",
    image: "https://images.lululemon.com/is/image/lululemon/LW4AWHS_028615_1",
    price: 118,
    triedOnAt: "2 days ago",
    color: "Navy",
    size: "8"
  },
  {
    id: 7,
    productName: "Performance Jogger",
    brand: "Vuori",
    image: "https://vuoriclothing.com/cdn/shop/files/VuoriClothing_FA24_SEPT_ECOMM_07_08_24_TT_LS-0005_1.jpg",
    price: 89,
    triedOnAt: "3 days ago",
    color: "Charcoal",
    size: "M"
  },
  {
    id: 8,
    productName: "Strato Tech Tee",
    brand: "Vuori",
    image: "https://vuoriclothing.com/cdn/shop/files/VuoriClothing_FA24_SEPT_ECOMM_07_08_24_TT_LS-0055_1.jpg",
    price: 68,
    triedOnAt: "3 days ago",
    color: "White",
    size: "L"
  },
  {
    id: 9,
    productName: "Fits Everybody T-Shirt",
    brand: "SKIMS",
    image: "https://skims.com/cdn/shop/files/FE-TSHRT-1015-BONE-FL.jpg",
    price: 52,
    triedOnAt: "4 days ago",
    color: "Bone",
    size: "M"
  },
  {
    id: 10,
    productName: "Soft Lounge Pant",
    brand: "SKIMS",
    image: "https://skims.com/cdn/shop/files/SL-PANT-2076-CLAY-FL.jpg",
    price: 78,
    triedOnAt: "4 days ago",
    color: "Clay",
    size: "S"
  },
  {
    id: 11,
    productName: "501 Original Jeans",
    brand: "Levi's",
    image: "https://lsco.scene7.com/is/image/lsco/005013638-front-pdp",
    price: 89.50,
    triedOnAt: "5 days ago",
    color: "Medium Stonewash",
    size: "30x32"
  },
  {
    id: 12,
    productName: "Trucker Jacket",
    brand: "Levi's",
    image: "https://lsco.scene7.com/is/image/lsco/723340223-front-pdp",
    price: 98,
    triedOnAt: "5 days ago",
    color: "Dark Denim",
    size: "M"
  },
  {
    id: 13,
    productName: "Goddess Legging",
    brand: "Alo Yoga",
    image: "https://cdn.shopify.com/s/files/1/1464/5034/files/W5707R_001_1.jpg",
    price: 128,
    triedOnAt: "1 week ago",
    color: "Black",
    size: "S"
  },
  {
    id: 14,
    productName: "Soho Pullover",
    brand: "Alo Yoga",
    image: "https://cdn.shopify.com/s/files/1/1464/5034/files/W5835R_439_1.jpg",
    price: 108,
    triedOnAt: "1 week ago",
    color: "Lavender",
    size: "M"
  },
  {
    id: 15,
    productName: "Bucket Hat",
    brand: "Malbon Golf",
    image: "https://malbon.com/cdn/shop/files/M-6129-003_1.png",
    price: 68,
    triedOnAt: "1 week ago",
    color: "Black",
    size: "OS"
  },
  {
    id: 16,
    productName: "Wunder Train Tights",
    brand: "Lululemon",
    image: "https://images.lululemon.com/is/image/lululemon/LW5DGYS_0001_1",
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
          {mockTryOnHistory.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-3">
                <div className="aspect-square mb-3 overflow-hidden rounded-md bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <h3 className="font-semibold text-sm line-clamp-2">{item.productName}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{item.triedOnAt}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.color} • {item.size}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                      <Heart className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" className="flex-1 h-8 text-xs">
                      <ShoppingCart className="w-3 h-3 mr-1" />
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
