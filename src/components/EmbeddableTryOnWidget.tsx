import { Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmbeddableTryOnWidgetProps {
  productUrl?: string;
  productName?: string;
  productImage?: string;
}

const EmbeddableTryOnWidget = ({ 
  productUrl, 
  productName, 
  productImage 
}: EmbeddableTryOnWidgetProps) => {
  
  const handleTryOn = () => {
    // Open the main Tuuin app in a new window with product info
    const params = new URLSearchParams({
      ...(productUrl && { url: productUrl }),
      ...(productName && { name: productName }),
      ...(productImage && { image: productImage }),
    });
    
    window.open(
      `${window.location.origin}/?${params.toString()}`,
      '_blank',
      'width=1200,height=800'
    );
  };

  return (
    <Button
      onClick={handleTryOn}
      className="fixed bottom-6 right-6 z-[9999] bg-[hsl(220,15%,85%)] text-foreground hover:bg-[hsl(220,15%,75%)] shadow-lg rounded-full px-6 py-6 flex items-center gap-2 transition-all hover:scale-105"
    >
      <Scan className="w-5 h-5" />
      Try On
    </Button>
  );
};

export default EmbeddableTryOnWidget;
