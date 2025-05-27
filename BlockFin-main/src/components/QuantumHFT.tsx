
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Hourglass, Zap, RefreshCw, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TradeSignal {
  id: string;
  asset: string;
  action: "buy" | "sell";
  price: number;
  confidence: number;
  timestamp: string;
  latency: number;
  algorithm: string;
}

export function QuantumHFT() {
  const [isRunning, setIsRunning] = useState(false);
  const [signals, setSignals] = useState<TradeSignal[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD");
  const [processingPower, setProcessingPower] = useState(0);
  const { toast } = useToast();

  // Simulate increasing quantum processing power
  useEffect(() => {
    if (isRunning && processingPower < 100) {
      const interval = setInterval(() => {
        setProcessingPower(prev => {
          const newPower = Math.min(prev + (Math.random() * 10), 100);
          if (newPower === 100) {
            generateSignals();
          }
          return newPower;
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isRunning, processingPower]);

  // Generate a trade signal periodically
  useEffect(() => {
    if (!isRunning || processingPower < 100) return;
    
    const interval = setInterval(() => {
      generateSignals(1, true);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isRunning, processingPower]);

  const startHFT = () => {
    setIsRunning(true);
    setProcessingPower(0);
    toast({
      title: "Quantum HFT Started",
      description: "Initializing quantum-inspired algorithms for market prediction",
    });
  };

  const stopHFT = () => {
    setIsRunning(false);
    toast({
      title: "Quantum HFT Stopped",
      description: "Trading signals paused",
    });
  };

  const generateSignals = (count = 4, append = false) => {
    const assets = ["BTC/USD", "ETH/USD", "SOL/USD", "ADA/USD"];
    const algorithms = [
      "Quantum Amplitude Estimation",
      "Variational Quantum Eigensolver",
      "Quantum Approximate Optimization",
      "Quantum Monte Carlo"
    ];
    
    const newSignals: TradeSignal[] = [];
    
    for (let i = 0; i < (count || 4); i++) {
      const now = new Date();
      const action = Math.random() > 0.5 ? "buy" : "sell";
      const asset = selectedAsset || assets[Math.floor(Math.random() * assets.length)];
      const basePrice = asset.startsWith("BTC") ? 50000 : 
                        asset.startsWith("ETH") ? 3000 : 
                        asset.startsWith("SOL") ? 120 : 1.5;
                        
      const signal: TradeSignal = {
        id: Math.random().toString(36).substring(2, 9),
        asset,
        action,
        price: parseFloat((basePrice + (Math.random() * basePrice * 0.02 * (action === "buy" ? 1 : -1))).toFixed(2)),
        confidence: parseFloat((Math.random() * 15 + 80).toFixed(2)),
        timestamp: now.toISOString(),
        latency: parseFloat((Math.random() * 0.8 + 0.2).toFixed(3)),
        algorithm: algorithms[Math.floor(Math.random() * algorithms.length)]
      };
      
      newSignals.push(signal);
    }
    
    if (append) {
      setSignals(prev => {
        const combined = [...newSignals, ...prev];
        return combined.slice(0, 8); // Keep the list at a reasonable size
      });
    } else {
      setSignals(newSignals);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quantum High-Frequency Trading
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Trading Pair</label>
            <Select 
              value={selectedAsset} 
              onValueChange={setSelectedAsset}
              disabled={isRunning}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                <SelectItem value="SOL/USD">SOL/USD</SelectItem>
                <SelectItem value="ADA/USD">ADA/USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end space-x-2">
            {!isRunning ? (
              <Button 
                onClick={startHFT} 
                className="flex-1"
              >
                <Gauge className="mr-2 h-4 w-4" />
                Start HFT
              </Button>
            ) : (
              <Button 
                onClick={stopHFT} 
                variant="outline"
                className="flex-1"
              >
                <Hourglass className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
        </div>
        
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Quantum Processing</span>
              <span className="text-sm">{Math.round(processingPower)}%</span>
            </div>
            <Progress value={processingPower} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {processingPower < 50 ? "Initializing quantum algorithms..." : 
               processingPower < 100 ? "Calibrating prediction model..." : 
               "Quantum accelerated trading active"}
            </p>
          </div>
        )}
        
        {signals.length > 0 && (
          <div className="pt-2 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Trading Signals</h3>
              {isRunning && processingPower === 100 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Live updating
                </div>
              )}
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                  <TableHead className="text-right">Latency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {signals.map((signal) => (
                  <TableRow key={signal.id}>
                    <TableCell className="font-medium">{signal.asset}</TableCell>
                    <TableCell>
                      <Badge
                        variant={signal.action === "buy" ? "default" : "destructive"}
                      >
                        {signal.action.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${signal.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{signal.confidence}%</TableCell>
                    <TableCell className="text-right font-mono">{signal.latency}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="text-xs text-muted-foreground pt-1">
              Powered by {signals[0]?.algorithm || "Quantum Algorithms"}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
