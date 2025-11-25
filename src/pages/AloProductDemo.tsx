import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";

const AloProductDemo = () => {
  const productData = {
    name: "ALO Softsculpt //8 Foldover Flare Legging",
    brand: "Alo Yoga",
    price: 144,
    url: "https://www.aloyoga.com/products/w54324r-alo-softsculpt-7-8-foldover-flare-legging-black",
    image: "https://www.aloyoga.com/cdn/shop/files/W54324R_001_1.jpg",
  };

  return (
    <div className="min-h-screen relative bg-white overflow-auto">
      {/* Alo Yoga Product Page - Scrollable Content */}
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Hero Section with Product Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Left side - Product Images */}
          <div className="space-y-4">
            <img 
              src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_1.jpg"
              alt="Alo Softsculpt Legging - Front View"
              className="w-full h-auto"
            />
            <img 
              src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_2.jpg"
              alt="Alo Softsculpt Legging - Side View"
              className="w-full h-auto"
            />
            <img 
              src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_3.jpg"
              alt="Alo Softsculpt Legging - Back Detail"
              className="w-full h-auto"
            />
            <img 
              src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_4.jpg"
              alt="Alo Softsculpt Legging - Lifestyle"
              className="w-full h-auto"
            />
          </div>

          {/* Right side - Product Info */}
          <div className="sticky top-4 h-fit space-y-6 p-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                ALO Softsculpt //8 Foldover Flare Legging
              </h1>
              <p className="text-2xl font-semibold">${productData.price}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Model is 5'10.5" wearing XS
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">
                Fit: True to size—designed for a breathable fit with medium compression
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Size Guide</p>
              <div className="grid grid-cols-3 gap-2">
                <button className="border border-gray-300 py-2 px-4 hover:border-black">
                  XXS (00-0)
                </button>
                <button className="border border-gray-300 py-2 px-4 hover:border-black">
                  XS (2-4)
                </button>
                <button className="border border-gray-300 py-2 px-4 hover:border-black">
                  S (4-6)
                </button>
                <button className="border border-gray-300 py-2 px-4 hover:border-black">
                  M (8-10)
                </button>
                <button className="border border-gray-300 py-2 px-4 hover:border-black">
                  L (12-14)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-black text-white py-4 font-semibold hover:bg-gray-800">
                ADD TO BAG
              </button>
              <button className="w-full border-2 border-black py-4 font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                ADD TO WISHLIST
              </button>
            </div>

            <div className="bg-green-100 py-3 px-4 text-sm text-center">
              Enjoy Extended Returns Through 1/10
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Try-On Widget Overlay */}
      <EmbeddableTryOnWidget
        productUrl={productData.url}
        productName={productData.name}
        productImage={productData.image}
      />
    </div>
  );
};

export default AloProductDemo;
