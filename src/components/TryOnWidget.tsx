import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

const TryOnWidget = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => setShowQRCode(true)}
        className="fixed bottom-6 right-24 z-50 bg-black text-white hover:bg-black/90 shadow-lg rounded-full px-6 py-6 flex items-center gap-2"
      >
        <QrCode className="w-5 h-5" />
        Try On
      </Button>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">Download Tuuin App</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <button 
              onClick={() => {
                setShowQRCode(false);
                navigate('/');
              }}
              className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer"
            >
              {/* QR Code - clickable to navigate to app */}
              <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-lg hover:from-primary/30 hover:to-secondary/30 transition-all">
                <QrCode className="w-32 h-32 text-primary" />
              </div>
            </button>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">Click to Try On</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Click the QR code to start creating your avatar and virtually try on clothes
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TryOnWidget;
