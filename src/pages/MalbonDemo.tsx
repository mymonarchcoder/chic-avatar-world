import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";
import { Heart, Search, ShoppingBag, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { aloProducts } from "@/data/aloProducts";

const MalbonDemo = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const currentProduct = aloProducts[selectedProductIndex];
  
  const productData = {
    name: currentProduct.name,
    brand: currentProduct.brand,
    price: currentProduct.price,
    url: `https://www.aloyoga.com/products/${currentProduct.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: currentProduct.image,
  };

  // Mock multiple images for each product
  const productImages = [
    currentProduct.image,
    currentProduct.image, // Using same image as placeholder
  ];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

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
      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex gap-0">
          {/* Left Image */}
          <div className="w-1/2 relative group">
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
              <img 
                src={productImages[0]} 
                alt={`${productData.name} - View 1`} 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Right Image */}
          <div className="w-1/2 relative group">
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
              <img 
                src={productImages[1]} 
                alt={`${productData.name} - View 2`} 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info Sidebar - Fixed Right */}
      <div className="fixed right-0 top-32 w-[400px] h-[calc(100vh-8rem)] bg-white border-l border-gray-200 overflow-y-auto p-6 z-10">
        <h1 className="text-xl font-medium mb-1">{productData.name}</h1>
        <p className="text-lg font-medium mb-6">${productData.price}</p>

        {/* Color */}
        <div className="mb-6">
          <p className="text-sm mb-3">
            Core: {currentProduct.color}{" "}
            <span className="underline cursor-pointer">(Shop All)</span>
          </p>
          <div className="flex gap-2 mb-2">
            <button className="w-12 h-12 rounded-full border-2 border-black bg-black" />
            <button className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-400" />
          </div>
          <p className="text-xs text-gray-600">Limited</p>
        </div>

        {/* Fit Info */}
        <div className="mb-6">
          <p className="text-sm">
            <span className="font-medium">Fit:</span> {currentProduct.description}
          </p>
        </div>

        {/* Size Guide */}
        <div className="mb-6">
          <button className="text-sm underline font-medium mb-3">Size Guide</button>
          <div className="grid grid-cols-2 gap-2">
            {currentProduct.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 px-4 border text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Bag */}
        <button className="w-full bg-black text-white py-4 text-sm font-medium hover:bg-gray-900 transition-colors mb-4">
          ADD TO BAG
        </button>

        {/* Model Info */}
        <p className="text-xs text-gray-600 text-center mb-6">
          Model is 5'9" wearing S
        </p>

        {/* Product Navigation */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t">
          <button
            onClick={() => setSelectedProductIndex((prev) => (prev > 0 ? prev - 1 : aloProducts.length - 1))}
            className="flex-1 py-2 border border-gray-300 hover:border-black transition-colors text-xs font-medium"
          >
            ← Previous
          </button>
          <span className="text-xs text-gray-600">
            {selectedProductIndex + 1}/{aloProducts.length}
          </span>
          <button
            onClick={() => setSelectedProductIndex((prev) => (prev < aloProducts.length - 1 ? prev + 1 : 0))}
            className="flex-1 py-2 border border-gray-300 hover:border-black transition-colors text-xs font-medium"
          >
            Next →
          </button>
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
