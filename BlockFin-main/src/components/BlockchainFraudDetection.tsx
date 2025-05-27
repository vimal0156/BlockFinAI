
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, CheckCircle2, FileSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  amount: string;
  from: string;
  to: string;
  timestamp: string;
  riskScore: number;
  category: "normal" | "suspicious" | "fraudulent";
}

export function BlockchainFraudDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    analyzed: 0,
    anomalies: 0,
    fraudulent: 0,
    safePercentage: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isAnalyzing && progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 5, 100);
          if (newProgress === 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            generateMockTransactions();
            toast({
              title: "Analysis Complete",
              description: "Transaction analysis completed with GNN algorithm",
            });
          }
          return newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, progress, toast]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setTransactions([]);
    toast({
      title: "Analysis Started",
      description: "Running Graph Neural Network for anomaly detection",
    });
  };

  const generateMockTransactions = () => {
    const mockTxs: Transaction[] = [];
    const addresses = [
      "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
      "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
      "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
    ];
    
    // Generate 6 random transactions
    for (let i = 0; i < 6; i++) {
      const isSuspicious = Math.random() < 0.3;
      const isFraudulent = Math.random() < 0.15;
      
      const category = isFraudulent ? "fraudulent" : isSuspicious ? "suspicious" : "normal";
      const riskScore = isFraudulent 
        ? Math.floor(Math.random() * 20 + 80) 
        : isSuspicious 
          ? Math.floor(Math.random() * 30 + 40)
          : Math.floor(Math.random() * 30 + 5);
      
      mockTxs.push({
        id: `0x${Math.random().toString(16).substr(2, 40)}`,
        amount: `${(Math.random() * 10).toFixed(4)} ETH`,
        from: addresses[Math.floor(Math.random() * addresses.length)],
        to: addresses[Math.floor(Math.random() * addresses.length)],
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        riskScore,
        category
      });
    }
    
    // Sort by risk score (highest first)
    mockTxs.sort((a, b) => b.riskScore - a.riskScore);
    
    setTransactions(mockTxs);
    
    // Calculate stats
    const fraudCount = mockTxs.filter(tx => tx.category === "fraudulent").length;
    const suspiciousCount = mockTxs.filter(tx => tx.category === "suspicious").length;
    
    setStats({
      analyzed: mockTxs.length,
      anomalies: suspiciousCount,
      fraudulent: fraudCount,
      safePercentage: Math.round(((mockTxs.length - suspiciousCount - fraudCount) / mockTxs.length) * 100)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Blockchain Fraud Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Quantum-resistant Graph Neural Networks (GNNs) analyze transaction patterns to detect anomalies and potential fraud.
        </div>
        
        <Button 
          onClick={startAnalysis} 
          disabled={isAnalyzing}
          className="w-full"
        >
          <FileSearch className="mr-2 h-4 w-4" />
          Analyze Recent Transactions
        </Button>
        
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Analysis Progress</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {progress < 30 ? "Indexing transaction graph..." : 
               progress < 60 ? "Running GNN algorithm..." : 
               progress < 90 ? "Detecting patterns..." : 
               "Computing risk scores..."}
            </p>
          </div>
        )}
        
        {transactions.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Analyzed</p>
                <p className="text-xl font-bold">{stats.analyzed}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Anomalies</p>
                <p className="text-xl font-bold text-amber-500">{stats.anomalies}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Fraudulent</p>
                <p className="text-xl font-bold text-red-500">{stats.fraudulent}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Transaction Analysis</h3>
              <div className="space-y-2">
                {transactions.map((tx, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-mono text-xs truncate max-w-[130px]">{tx.id}</div>
                      <Badge 
                        variant={
                          tx.category === "fraudulent" ? "destructive" : 
                          tx.category === "suspicious" ? "outline" : 
                          "default"
                        }
                        className="font-mono"
                      >
                        {tx.category === "fraudulent" ? 
                          <AlertTriangle className="mr-1 h-3 w-3" /> : 
                          tx.category === "suspicious" ? 
                          null : 
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        }
                        {tx.category === "fraudulent" ? "High Risk" : 
                         tx.category === "suspicious" ? "Suspicious" : 
                         "Safe"}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">{tx.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Risk Score:</span>
                        <span className={`font-medium ${
                          tx.riskScore > 70 ? "text-red-500" : 
                          tx.riskScore > 40 ? "text-amber-500" : 
                          "text-green-500"
                        }`}>
                          {tx.riskScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
