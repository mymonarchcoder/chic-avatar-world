import { useState } from "react";
import { Scan, ExternalLink, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AvatarWidget from "@/components/AvatarWidget";
import { useAvatarModal } from "@/contexts/AvatarModalContext";
import { useToast } from "@/hooks/use-toast";

const popularSites = [
  { name: "Malbon Golf", url: "https://malbon.com" },
  { name: "Alo Yoga", url: "https://aloyoga.com" },
  { name: "Lululemon", url: "https://shop.lululemon.com" },
  { name: "Vuori", url: "https://vuoriclothing.com" },
  { name: "Skims", url: "https://skims.com" },
  { name: "Levi's", url: "https://levi.com" },
];

const ShopWithTryOn = () => {
  const navigate = useNavigate();
  const { openModal } = useAvatarModal();
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [loadedUrl, setLoadedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadUrl = (siteUrl: string) => {
    setIsLoading(true);
    
    // Validate URL
    try {
      const urlObj = new URL(siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`);
      setLoadedUrl(urlObj.toString());
      
      toast({
        title: "Site loaded",
        description: "You can now browse and use the Try-On widget",
      });
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      handleLoadUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AvatarWidget />
      
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-4xl font-bold mb-2">Shop with Virtual Try-On</h1>
            <p className="text-muted-foreground">
              Browse your favorite brands and try on items with your avatar
            </p>
          </div>

          {/* URL Input Section */}
          {!loadedUrl && (
            <div className="space-y-8">
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="url" className="text-sm font-medium mb-2 block">
                      Enter a shopping website URL
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com or example.com"
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        disabled={!url || isLoading}
                        className="shrink-0"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Load Site
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Popular Sites */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Popular Brands</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {popularSites.map((site) => (
                    <button
                      key={site.name}
                      onClick={() => {
                        setUrl(site.url);
                        handleLoadUrl(site.url);
                      }}
                      className="bg-card border rounded-lg p-4 hover:border-primary transition-all text-left group"
                    >
                      <p className="font-medium group-hover:text-primary">{site.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{site.url}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* How it Works */}
              <div className="bg-muted/30 rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">How it works</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                      1
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Enter a shopping website URL or choose from popular brands
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                      2
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Browse products on the external site
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                      3
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Click the Try-On widget to virtually try items with your avatar
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Loaded Website with Try-On Widget */}
          {loadedUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-card border rounded-lg p-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ExternalLink className="w-5 h-5 text-muted-foreground shrink-0" />
                  <p className="text-sm font-medium truncate">{loadedUrl}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={openModal}
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Try On
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLoadedUrl("");
                      setUrl("");
                    }}
                  >
                    Change Site
                  </Button>
                </div>
              </div>

              <div className="relative bg-card border rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 300px)' }}>
                <iframe
                  src={loadedUrl}
                  className="w-full h-full"
                  title="Shopping Website"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>

              <div className="bg-muted/30 rounded-lg p-4 border">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> Browse the site above and click the "Try On" button to open 
                  your virtual avatar and try on items from this brand.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopWithTryOn;
