import EmbeddableTryOnWidget from "@/components/EmbeddableTryOnWidget";
import { useEffect, useState } from "react";

const WidgetEmbed = () => {
  const [productInfo, setProductInfo] = useState({
    url: "",
    name: "",
    image: "",
  });

  useEffect(() => {
    // Get product info from URL params or postMessage from parent
    const params = new URLSearchParams(window.location.search);
    setProductInfo({
      url: params.get('url') || "",
      name: params.get('name') || "",
      image: params.get('image') || "",
    });

    // Listen for messages from parent window (if embedded in iframe)
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'productInfo') {
        setProductInfo({
          url: event.data.url || "",
          name: event.data.name || "",
          image: event.data.image || "",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="w-full h-full bg-transparent">
      <EmbeddableTryOnWidget
        productUrl={productInfo.url}
        productName={productInfo.name}
        productImage={productInfo.image}
      />
    </div>
  );
};

export default WidgetEmbed;
