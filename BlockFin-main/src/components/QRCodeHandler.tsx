import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Scan, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeHandlerProps {
  address: string;
  onScan: (data: string) => void;
}

export function QRCodeHandler({ address, onScan }: QRCodeHandlerProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Implementation would go here
      stream.getTracks().forEach(track => track.stop());
      onScan("mock_scanned_address");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Scanner Error",
        description: "Could not access camera",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast({
      title: "Address Copied",
      description: "The wallet address has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            value={address}
            readOnly
            className="font-mono text-sm"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex justify-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`}
            alt="Wallet QR Code"
            className="w-48 h-48"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => setShowScanner(!showScanner)} className="gap-2">
            <Scan className="w-4 h-4" />
            {showScanner ? "Hide Scanner" : "Scan QR Code"}
          </Button>
        </div>

        {showScanner && (
          <div className="mt-4">
            <Button onClick={handleScan} className="w-full gap-2">
              <QrCode className="w-4 h-4" />
              Start Scanning
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}