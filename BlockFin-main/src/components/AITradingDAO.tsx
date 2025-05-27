
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, BarChart3, TrendingUp, CircleDollarSign, 
  Lock, LineChart, Cog, Shield, ExternalLink, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PortfolioAllocation {
  asset: string;
  targetPercent: number;
  currentPercent: number;
  status: 'optimal' | 'rebalancing' | 'analyzing';
}

interface AIDecision {
  timestamp: string;
  action: string;
  reasoning: string;
  confidence: number;
  status: 'pending' | 'executed' | 'rejected';
}

export function AITradingDAO() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [currentReturn, setCurrentReturn] = useState(18.7);
  const [currentRisk, setCurrentRisk] = useState('Moderate');
  const [depositAmount, setDepositAmount] = useState('');
  const { toast } = useToast();

  const [allocations, setAllocations] = useState<PortfolioAllocation[]>([
    { asset: 'Bitcoin (BTC)', targetPercent: 35, currentPercent: 32, status: 'rebalancing' },
    { asset: 'Ethereum (ETH)', targetPercent: 25, currentPercent: 27, status: 'rebalancing' },
    { asset: 'USD Coin (USDC)', targetPercent: 15, currentPercent: 15, status: 'optimal' },
    { asset: 'DeFi Index', targetPercent: 15, currentPercent: 12, status: 'analyzing' },
    { asset: 'NFT Collection', targetPercent: 10, currentPercent: 14, status: 'rebalancing' },
  ]);

  const [aiDecisions, setAiDecisions] = useState<AIDecision[]>([
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      action: 'Reduce BTC exposure by 3%',
      reasoning: 'On-chain metrics suggest increased selling pressure over next 48 hours',
      confidence: 87,
      status: 'executed'
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      action: 'Increase ETH allocation to 25%',
      reasoning: 'Positive sentiment shift after successful network upgrade',
      confidence: 92,
      status: 'executed'
    },
    { 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      action: 'Reduce NFT exposure by 5%',
      reasoning: 'Volume decline in blue-chip collections suggests market cooling',
      confidence: 76,
      status: 'pending'
    },
  ]);

  useEffect(() => {
    if (isOptimizing && optimizationProgress < 100) {
      const interval = setInterval(() => {
        setOptimizationProgress(prev => {
          const increment = Math.random() * 5;
          const newProgress = Math.min(prev + increment, 100);
          
          if (newProgress === 100) {
            setIsOptimizing(false);
            generateOptimizedAllocations();
            toast({
              title: "Portfolio Optimization Complete",
              description: "AI has rebalanced your portfolio for optimal risk-adjusted returns",
            });
          }
          
          return newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isOptimizing, optimizationProgress, toast]);

  const startOptimization = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    toast({
      title: "AI Optimization Started",
      description: "Analyzing market conditions and optimizing allocations...",
    });
  };

  const generateOptimizedAllocations = () => {
    // Simulate AI generating new allocations
    const newAllocations = [...allocations];
    
    // Make some random adjustments to simulate AI optimization
    newAllocations.forEach(asset => {
      const adjustment = Math.random() * 8 - 4;
      asset.targetPercent = Math.max(5, Math.min(40, asset.targetPercent + adjustment));
      asset.status = Math.random() > 0.6 ? 'rebalancing' : 'optimal';
    });
    
    // Normalize to ensure sum is 100%
    const sum = newAllocations.reduce((acc, asset) => acc + asset.targetPercent, 0);
    newAllocations.forEach(asset => {
      asset.targetPercent = Math.round(asset.targetPercent * 100 / sum);
    });
    
    setAllocations(newAllocations);
    
    // Generate a new AI decision
    const newDecision: AIDecision = {
      timestamp: new Date().toISOString(),
      action: 'Portfolio rebalance across all assets',
      reasoning: 'Optimized for maximum Sharpe ratio in current market conditions',
      confidence: 94,
      status: 'executed'
    };
    
    setAiDecisions([newDecision, ...aiDecisions]);
    
    // Simulate improvement in returns
    setCurrentReturn(prev => parseFloat((prev + (Math.random() * 2 - 0.5)).toFixed(1)));
  };

  const handleDeposit = () => {
    if (!depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Deposit Successful",
      description: `$${depositAmount} has been added to your AI-managed portfolio`,
    });
    
    setDepositAmount('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Governed Trading DAO
          </CardTitle>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Live Trading
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocations">Allocations</TabsTrigger>
            <TabsTrigger value="decisions">AI Decisions</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Current Return
                </h3>
                <p className="text-2xl font-bold">{currentReturn}%</p>
                <p className="text-xs text-muted-foreground">+3.2% last 7 days</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-500" />
                  Risk Level
                </h3>
                <p className="text-2xl font-bold">{currentRisk}</p>
                <p className="text-xs text-muted-foreground">Sharpe Ratio: 2.1</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Total Value Locked
                </h3>
                <p className="text-2xl font-bold">$8.3M</p>
                <p className="text-xs text-muted-foreground">382 participants</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg mt-4">
              <h3 className="font-medium mb-3">AI Strategy Overview</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This autonomous trading DAO uses reinforcement learning to dynamically allocate capital across crypto assets, DeFi protocols, and NFT collections. The AI optimizes for risk-adjusted returns in all market conditions.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Self-Learning Strategy</h4>
                    <p className="text-xs text-muted-foreground">The AI uses reinforcement learning to continuously improve its trading strategies based on market performance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Risk Management</h4>
                    <p className="text-xs text-muted-foreground">Advanced drawdown protection with automatic market regime detection and adaptive portfolio allocation.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Cog className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Transparent Governance</h4>
                    <p className="text-xs text-muted-foreground">All AI decisions are recorded on-chain with full transparency for participants.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setActiveTab("decisions")}>
                  <LineChart className="w-4 h-4 mr-2" />
                  View AI Decisions
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("deposit")}>
                  <CircleDollarSign className="w-4 h-4 mr-2" />
                  Deposit Funds
                </Button>
              </div>
            </div>
            
            {isOptimizing && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Optimizing portfolio</span>
                  <span className="text-sm">{Math.round(optimizationProgress)}%</span>
                </div>
                <Progress value={optimizationProgress} />
                <div className="text-xs text-muted-foreground pt-1">
                  AI is analyzing market conditions and rebalancing assets...
                </div>
              </div>
            )}
            
            {!isOptimizing && (
              <Button 
                onClick={startOptimization} 
                className="w-full mt-4"
              >
                <Brain className="w-4 h-4 mr-2" />
                Run AI Portfolio Optimization
              </Button>
            )}
          </TabsContent>
          
          <TabsContent value="allocations" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Current Portfolio Allocation</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={startOptimization} disabled={isOptimizing}>
                    {isOptimizing ? 'Optimizing...' : 'Optimize'}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {allocations.map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{allocation.asset}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            allocation.status === 'optimal' 
                              ? 'bg-green-100 text-green-800' 
                              : allocation.status === 'rebalancing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                          }
                        >
                          {allocation.status === 'optimal' ? 'Optimal' : allocation.status === 'rebalancing' ? 'Rebalancing' : 'Analyzing'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{allocation.currentPercent}%</span>
                        <span className="text-sm text-muted-foreground">→</span>
                        <span className="text-sm font-medium">{allocation.targetPercent}%</span>
                      </div>
                    </div>
                    
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full ${
                          allocation.status === 'optimal' 
                            ? 'bg-green-500' 
                            : allocation.status === 'rebalancing'
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                        }`}
                        style={{ width: `${allocation.currentPercent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-muted rounded-lg mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-medium">AI Risk Assessment</h4>
                  </div>
                  <Badge>{currentRisk} Risk</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Current allocation is optimized for {currentRisk.toLowerCase()} risk with expected return of {currentReturn}% annualized. AI constantly monitors market conditions to adjust risk exposure.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="decisions" className="space-y-4">
            <h3 className="font-medium mb-2">Recent AI Trading Decisions</h3>
            
            <div className="space-y-4">
              {aiDecisions.map((decision, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <h4 className="font-medium">{decision.action}</h4>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        decision.status === 'executed' 
                          ? 'bg-green-100 text-green-800' 
                          : decision.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }
                    >
                      {decision.status.charAt(0).toUpperCase() + decision.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {decision.reasoning}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="font-medium">{decision.confidence}%</span>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(decision.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All Decisions
              </Button>
              <Button size="sm" onClick={startOptimization} disabled={isOptimizing}>
                <Brain className="w-4 h-4 mr-2" />
                Request New Analysis
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="deposit" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-4">Deposit Funds into AI-DAO</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Deposit Amount (USD)</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Risk Preference</label>
                  <select className="w-full p-2 rounded-md border mt-1">
                    <option>Conservative (5-10% target return)</option>
                    <option selected>Moderate (10-20% target return)</option>
                    <option>Aggressive (20-30%+ target return)</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Investment Timeframe</label>
                  <select className="w-full p-2 rounded-md border mt-1">
                    <option>3-6 months</option>
                    <option selected>6-12 months</option>
                    <option>1-3 years</option>
                    <option>3+ years</option>
                  </select>
                </div>
                
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                    <div>
                      <p className="font-medium">Risk Disclaimer</p>
                      <p className="mt-1 text-xs">
                        AI-DAO investments involve risk of loss. Past performance is not indicative of future results. The AI adapts to market conditions but cannot guarantee profits.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleDeposit} className="w-full">
                  <CircleDollarSign className="w-4 h-4 mr-2" />
                  Deposit Funds
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Performance Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Historical Return</p>
                  <p className="text-xl font-bold">24.3%</p>
                  <p className="text-xs text-muted-foreground">Annualized since inception</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Max Drawdown</p>
                  <p className="text-xl font-bold">-18.1%</p>
                  <p className="text-xs text-muted-foreground">Worst period performance</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
