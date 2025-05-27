
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, BarChart2, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TradeAction {
  action: 'buy' | 'sell' | 'hold';
  asset: string;
  confidence: number;
  reason: string;
  timestamp: string;
}

interface AgentPerformance {
  totalReward: number;
  winRate: number;
  tradesExecuted: number;
  currentEpisode: number;
  successfulPredictions: number;
}

export function TradingAgent() {
  const [selectedModel, setSelectedModel] = useState<string>("dqn");
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [isBacktesting, setIsBacktesting] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [backtestProgress, setBacktestProgress] = useState<number>(0);
  const [recentActions, setRecentActions] = useState<TradeAction[]>([]);
  const [performance, setPerformance] = useState<AgentPerformance>({
    totalReward: 0,
    winRate: 0,
    tradesExecuted: 0,
    currentEpisode: 0,
    successfulPredictions: 0
  });
  const [activeTab, setActiveTab] = useState<string>("agent");
  const { toast } = useToast();

  // Simulate training progress when training is active
  useEffect(() => {
    if (isTraining && trainingProgress < 100) {
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          const increment = Math.random() * 5;
          const newProgress = Math.min(prev + increment, 100);
          
          if (newProgress === 100) {
            setIsTraining(false);
            generateMockPerformance();
            toast({
              title: "Training Complete",
              description: `${selectedModel.toUpperCase()} model trained successfully`,
            });
          }
          
          return newProgress;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isTraining, trainingProgress, selectedModel, toast]);

  // Simulate backtesting progress
  useEffect(() => {
    if (isBacktesting && backtestProgress < 100) {
      const interval = setInterval(() => {
        setBacktestProgress(prev => {
          const increment = Math.random() * 8;
          const newProgress = Math.min(prev + increment, 100);
          
          if (newProgress === 100) {
            setIsBacktesting(false);
            generateMockActions();
            toast({
              title: "Backtesting Complete",
              description: "Historical simulation completed with 87% accuracy",
            });
          }
          
          return newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isBacktesting, backtestProgress, toast]);

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    toast({
      title: "Training Started",
      description: `Training ${selectedModel.toUpperCase()} reinforcement learning model`,
    });
  };

  const startBacktesting = () => {
    setIsBacktesting(true);
    setBacktestProgress(0);
    toast({
      title: "Backtesting Started",
      description: "Simulating model performance against historical data",
    });
  };

  const generateMockPerformance = () => {
    setPerformance({
      totalReward: parseFloat((Math.random() * 1000 + 500).toFixed(2)),
      winRate: parseFloat((Math.random() * 30 + 60).toFixed(2)),
      tradesExecuted: Math.floor(Math.random() * 100 + 50),
      currentEpisode: Math.floor(Math.random() * 1000 + 500),
      successfulPredictions: Math.floor(Math.random() * 100 + 40)
    });
  };

  const generateMockActions = () => {
    const assets = ["BTC", "ETH", "SOL", "ADA", "DOT"];
    const actions: TradeAction[] = [];
    
    for (let i = 0; i < 5; i++) {
      const action: TradeAction = {
        action: ['buy', 'sell', 'hold'][Math.floor(Math.random() * 3)] as 'buy' | 'sell' | 'hold',
        asset: assets[Math.floor(Math.random() * assets.length)],
        confidence: parseFloat((Math.random() * 30 + 70).toFixed(2)),
        reason: [
          "Bullish pattern detected in 1h chart",
          "Price below moving average",
          "Positive sentiment in social media",
          "Oversold on RSI indicator",
          "Support level holding strong"
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date().toISOString()
      };
      actions.push(action);
    }
    
    setRecentActions(actions);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Reinforcement Learning Trading Agent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="agent">Agent</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agent" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Select RL Algorithm</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dqn">Deep Q-Network (DQN)</SelectItem>
                  <SelectItem value="ppo">Proximal Policy Optimization (PPO)</SelectItem>
                  <SelectItem value="a2c">Advantage Actor-Critic (A2C)</SelectItem>
                  <SelectItem value="sac">Soft Actor-Critic (SAC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Button onClick={startTraining} disabled={isTraining} className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4" />
                Train Model
              </Button>
              <Button onClick={startBacktesting} disabled={isBacktesting} variant="outline" className="flex items-center">
                <History className="mr-2 h-4 w-4" />
                Run Backtest
              </Button>
            </div>
            
            {performance.totalReward > 0 && (
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-medium">Agent Performance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Total Reward</p>
                    <p className="text-xl font-bold">${performance.totalReward}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-xl font-bold">{performance.winRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Trades</p>
                    <p className="text-xl font-bold">{performance.tradesExecuted}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Episodes</p>
                    <p className="text-xl font-bold">{performance.currentEpisode}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-xl font-bold">{performance.successfulPredictions}%</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="training" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Training Progress</span>
                <span className="text-sm">{Math.round(trainingProgress)}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
            </div>
            
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium">Training Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 rounded-md bg-muted">
                  <p className="text-xs text-muted-foreground">Learning Rate</p>
                  <p className="text-sm font-medium">0.0003</p>
                </div>
                <div className="p-2 rounded-md bg-muted">
                  <p className="text-xs text-muted-foreground">Discount Factor</p>
                  <p className="text-sm font-medium">0.99</p>
                </div>
                <div className="p-2 rounded-md bg-muted">
                  <p className="text-xs text-muted-foreground">Batch Size</p>
                  <p className="text-sm font-medium">64</p>
                </div>
                <div className="p-2 rounded-md bg-muted">
                  <p className="text-xs text-muted-foreground">Memory Size</p>
                  <p className="text-sm font-medium">10,000</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="backtesting" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Backtesting Progress</span>
                <span className="text-sm">{Math.round(backtestProgress)}%</span>
              </div>
              <Progress value={backtestProgress} className="w-full" />
            </div>
            
            {recentActions.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Recent Agent Actions</h3>
                <div className="space-y-2">
                  {recentActions.map((action, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant={action.action === 'buy' ? 'default' : action.action === 'sell' ? 'destructive' : 'outline'}>
                            {action.action.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{action.asset}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(action.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{action.reason}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{action.confidence}% confidence</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
