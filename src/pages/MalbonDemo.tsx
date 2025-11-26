import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import product1 from "@/assets/alo-product-1.jpg";
import product2 from "@/assets/alo-product-2.jpg";
import product3 from "@/assets/alo-product-3.jpg";
import product4 from "@/assets/alo-product-4.jpg";

const MalbonDemo = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("navy");
  
  const productData = {
    name: "Alo Yoga Airlift Intrigue Bra",
    brand: "Alo Yoga",
    price: 68,
    url: "https://www.aloyoga.com/products/w2474r-airlift-intrigue-bra-navy",
    image: "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=800&h=1000&fit=crop",
  };

  const colors = [
    { name: "Navy", value: "navy", hex: "#1e3a5f" },
    { name: "Forest Green", value: "forest", hex: "#2d5016" },
    { name: "Light Blue", value: "lightblue", hex: "#a8c5dd" },
    { name: "Taupe", value: "taupe", hex: "#c9b8a7" },
    { name: "Sage", value: "sage", hex: "#a8b5a0" },
    { name: "Gray", value: "gray", hex: "#b5c1c6" },
    { name: "Mauve", value: "mauve", hex: "#c89da5" },
    { name: "Beige", value: "beige", hex: "#d9c7b8" },
    { name: "Coral Red", value: "coral", hex: "#e74c3c" },
    { name: "Olive", value: "olive", hex: "#6b7c4a" },
  ];

  const sizes = [
    { label: "XXS (00-0)", value: "XXS" },
    { label: "XS (2-4)", value: "XS" },
    { label: "S (4-6)", value: "S" },
    { label: "M (8-10)", value: "M" },
    { label: "L (12-14)", value: "L" },
  ];

  const productImages = [
    product1,
    product2,
    product3,
    product4,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-[#2d4a3e] text-white text-center py-2 text-sm font-medium">
        FREE SHIPPING & EXTENDED RETURNS TILL 1/10
      </div>

      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-4xl font-bold tracking-tight">alo</div>
            <nav className="hidden md:flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-gray-600">WOMEN</a>
              <a href="#" className="hover:text-gray-600">MEN</a>
              <a href="#" className="hover:text-gray-600">SHOES</a>
              <a href="#" className="hover:text-gray-600">GIFT GUIDE</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-600">
              <User className="w-5 h-5" />
              SIGN IN TO GET REWARDS
            </button>
            <Heart className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </header>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {productImages.map((img, idx) => (
              <div key={idx} className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-8 h-fit">
            <h1 className="text-2xl font-medium mb-2">{productData.name}</h1>
            <p className="text-xl font-medium mb-6">${productData.price}</p>

            {/* Colors */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  Limited: Navy <span className="underline cursor-pointer">(Shop All)</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.value ? "border-black scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Fit Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <p className="text-sm font-medium mb-2">Fit:</p>
              <p className="text-sm text-gray-700">
                Designed with high compression for a snug fit—we recommend sizing up if you have a fuller cup size
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Size Guide</span>
                <span className="text-sm underline cursor-pointer">Find My Size</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`py-3 px-4 border text-sm font-medium transition-all ${
                      selectedSize === size.value
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag */}
            <button className="w-full bg-black text-white py-4 text-sm font-medium hover:bg-gray-900 transition-colors mb-3">
              ADD TO BAG
            </button>

            {/* Model Info */}
            <p className="text-xs text-gray-600 text-center">
              Model is 5'9.5" wearing S
            </p>
          </div>
        </div>
      </div>

      {/* Try-On Widget */}
      <EmbeddableTryOnWidget
        productUrl={productData.url}
        productName={productData.name}
        productImage={productData.image}
      />
    </div>
  );
};

export default MalbonDemo;
