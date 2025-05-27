import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CryptoPaymentMethodProps {
  cryptoName: string;
  address: string;
  icon: string;
  amount: number;
  exchangeRate: number;
}

export function CryptoPaymentMethod({
  cryptoName,
  address,
  icon,
  amount,
  exchangeRate,
}: CryptoPaymentMethodProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast({
      title: "Address copied",
      description: "The wallet address has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const cryptoAmount = (amount / exchangeRate).toFixed(8);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Pay with {cryptoName}</CardTitle>
        <img src={icon} alt={cryptoName} className="w-8 h-8" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Amount: {cryptoAmount} {cryptoName}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 p-2 bg-secondary rounded text-sm font-mono">
            {address}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyAddress}
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowQR(!showQR)}
            className="shrink-0"
          >
            <QrCode className="h-4 w-4" />
          </Button>
        </div>
        {showQR && (
          <div className="flex justify-center p-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`}
              alt="Payment QR Code"
              className="w-48 h-48"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}