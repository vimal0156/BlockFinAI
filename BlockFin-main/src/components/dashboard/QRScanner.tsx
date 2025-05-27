import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  onScan: (data: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Camera access failed:', error);
        toast({
          variant: "destructive",
          title: "Camera Access Failed",
          description: "Please allow camera access to scan QR codes",
        });
      }
    };

    startScanner();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 w-full max-w-sm mx-auto">
          <video 
            ref={videoRef} 
            className="h-full w-full object-cover rounded-lg"
            autoPlay 
            playsInline 
          />
          <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none" />
        </div>
      </CardContent>
    </Card>
  );
}