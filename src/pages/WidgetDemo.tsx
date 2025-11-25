import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WidgetDemo = () => {
  const { toast } = useToast();
  const [demoUrl, setDemoUrl] = useState("https://aloyoga.com/products/high-waist-airlift-legging");
  const widgetUrl = `${window.location.origin}/widget-embed`;

  const embedCode = `<!-- Tuuin Virtual Try-On Widget -->
<iframe 
  src="${widgetUrl}?url=${encodeURIComponent(demoUrl)}"
  style="position: fixed; bottom: 0; right: 0; width: 200px; height: 100px; border: none; z-index: 9999; pointer-events: none;"
  allow="popups"
></iframe>
<script>
  document.querySelector('iframe[src*="widget-embed"]').contentWindow.style.pointerEvents = 'auto';
</script>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Partner Widget Integration</h1>
            <p className="text-muted-foreground">
              Embed the Virtual Try-On widget on your partner websites
            </p>
          </div>

          {/* Live Demo */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Live Demo</h2>
            <p className="text-sm text-muted-foreground">
              This simulates how the widget would appear on a partner's product page
            </p>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product URL (for demo)</label>
              <div className="flex gap-2">
                <Input
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="Enter product URL"
                />
                <Button variant="outline" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative bg-muted/30 rounded-lg overflow-hidden" style={{ height: '500px' }}>
              <iframe
                src={demoUrl}
                className="w-full h-full"
                title="Partner Website Demo"
                sandbox="allow-same-origin allow-scripts"
              />
              
              {/* Simulated Widget Overlay */}
              <iframe
                src={`${widgetUrl}?url=${encodeURIComponent(demoUrl)}`}
                className="absolute bottom-0 right-0 border-none pointer-events-auto"
                style={{ width: '200px', height: '100px', zIndex: 9999 }}
                title="Try-On Widget"
                allow="popups"
              />
            </div>
          </Card>

          {/* Integration Instructions */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Integration Instructions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">For Partners:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Copy the embed code below</li>
                  <li>Paste it before the closing &lt;/body&gt; tag on your product pages</li>
                  <li>Replace the URL parameter with your product page URL</li>
                  <li>The widget will automatically appear on your site</li>
                </ol>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Embed Code</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(embedCode)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{embedCode}</code>
                </pre>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> The widget will open the Virtual Try-On experience in a new window, 
                  allowing customers to create their avatar and try on products without leaving your site's context.
                </p>
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Widget Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Lightweight and non-intrusive design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Automatically detects product information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Opens in new window to preserve shopping experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Mobile and desktop responsive</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Easy one-line integration</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WidgetDemo;
