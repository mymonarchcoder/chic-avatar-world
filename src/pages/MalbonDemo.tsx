import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";

const MalbonDemo = () => {
  const productData = {
    name: "Alo Softsculpt 7/8 Foldover Flare Legging",
    brand: "Alo Yoga",
    price: 118,
    url: "https://www.aloyoga.com/products/w54324r-alo-softsculpt-7-8-foldover-flare-legging-black",
    image: "https://www.aloyoga.com/cdn/shop/files/W54324R_001_1.jpg",
  };

  return (
    <div className="min-h-screen">
      {/* Embedded Alo Yoga Product Page */}
      <iframe
        src={productData.url}
        className="w-full h-screen border-0"
        title="Alo Yoga Product Page"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
      
      {/* Our Try-On Widget Overlay */}
      <EmbeddableTryOnWidget
        productUrl={productData.url}
        productName={productData.name}
        productImage={productData.image}
      />
    </div>
  );
};

export default MalbonDemo;
