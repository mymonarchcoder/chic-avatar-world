import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";

const MalbonDemo = () => {
  const productData = {
    name: "Condor Coolcore Pant",
    brand: "Malbon Golf",
    price: 158,
    url: "https://malbon.com/products/condor-coolcore-pant-navy",
    image: "https://malbon.com/cdn/shop/files/M-9408-NVY_revised_1.png?crop=center&height=2560&v=1756838592&width=720",
  };

  return (
    <div className="min-h-screen">
      {/* Embedded Malbon Product Page */}
      <iframe
        src={productData.url}
        className="w-full h-screen border-0"
        title="Malbon Product Page"
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
