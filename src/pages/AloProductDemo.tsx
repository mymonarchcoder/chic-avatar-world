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
    <div className="min-h-screen relative bg-background overflow-auto">
      {/* Alo Yoga Product Page Screenshot */}
      <div className="w-full max-w-[1920px] mx-auto">
        <img 
          src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_2.jpg"
          alt="Alo Yoga Product - Full Body"
          className="w-full h-auto"
        />
        <img 
          src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_3.jpg"
          alt="Alo Yoga Product - Detail"
          className="w-full h-auto"
        />
        <img 
          src="https://www.aloyoga.com/cdn/shop/files/W54324R_001_4.jpg"
          alt="Alo Yoga Product - Back View"
          className="w-full h-auto"
        />
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
