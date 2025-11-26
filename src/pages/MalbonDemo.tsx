import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import product1 from "@/assets/alo-product-1.jpg";
import product2 from "@/assets/alo-product-2.jpg";
import product3 from "@/assets/alo-product-3.jpg";
import product4 from "@/assets/alo-product-4.jpg";
import { aloProducts } from "@/data/aloProducts";

const MalbonDemo = () => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  
  const currentProduct = aloProducts[selectedProductIndex];
  
  const productData = {
    name: currentProduct.name,
    brand: currentProduct.brand,
    price: currentProduct.price,
    url: `https://www.aloyoga.com/products/${currentProduct.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: currentProduct.image,
  };

  const sizes = currentProduct.sizes.map(size => ({
    label: size,
    value: size
  }));

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

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  Color: {currentProduct.color}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-700">
                {currentProduct.description}
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

            {/* Product Navigation */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setSelectedProductIndex((prev) => (prev > 0 ? prev - 1 : aloProducts.length - 1))}
                className="px-4 py-2 border border-gray-300 hover:border-black transition-colors text-sm"
              >
                Previous Product
              </button>
              <span className="text-xs text-gray-600">
                {selectedProductIndex + 1} of {aloProducts.length}
              </span>
              <button
                onClick={() => setSelectedProductIndex((prev) => (prev < aloProducts.length - 1 ? prev + 1 : 0))}
                className="px-4 py-2 border border-gray-300 hover:border-black transition-colors text-sm"
              >
                Next Product
              </button>
            </div>
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
