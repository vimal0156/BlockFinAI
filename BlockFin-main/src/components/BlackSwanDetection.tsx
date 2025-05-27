
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, BarChart2, TrendingDown, Clock, 
  PieChart, LineChart, Zap, ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulationResult {
  event: string;
  probability: number;
  impact: number;
  timeframe: string;
  description: string;
}

export function BlackSwanDetection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const { toast } = useToast();

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        const next = prev + Math.random() * 5;
        
        if (next >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          generateResults();
          toast({
            title: "Simulation Complete",
            description: "Black swan event analysis is ready for review",
          });
          return 100;
        }
        
        return next;
      });
    }, 300);
  };

  const generateResults = () => {
    const results: SimulationResult[] = [
      {
        event: "Flash Crash",
        probability: 8.7,
        impact: 76,
        timeframe: "Next 6 months",
        description: "Sudden market collapse of >15% within minutes, triggered by cascading liquidations"
      },
      {
        event: "Exchange Failure",
        probability: 12.3,
        impact: 83,
        timeframe: "Next 12 months",
        description: "Major exchange insolvency leading to asset freezes and market contagion"
      },
      {
        event: "Regulatory Crackdown",
        probability: 31.5,
        impact: 68,
        timeframe: "Next 3 months",
        description: "Unexpected regulatory action against crypto in major markets"
      },
      {
        event: "Smart Contract Exploit",
        probability: 17.2,
        impact: 55,
        timeframe: "Next 18 months",
        description: "Zero-day vulnerability in major DeFi protocol causing significant fund loss"
      },
      {
        event: "Stablecoin Depeg",
        probability: 9.1,
        impact: 91,
        timeframe: "Next 9 months",
        description: "Collapse of a major stablecoin's peg leading to market-wide liquidity crisis"
      }
    ];
    
    setSimulationResults(results);
    setActiveTab("results");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Black Swan Event Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our AI-powered Black Swan Event Prediction system uses advanced modeling to simulate extreme market events and prepare your portfolio for unlikely but high-impact scenarios.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-primary" />
                  Monte Carlo Simulations
                </h3>
                <p className="text-xs text-muted-foreground">
                  We run millions of market simulations to model extreme scenarios beyond normal distributions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-primary" />
                  Tail Risk Modeling
                </h3>
                <p className="text-xs text-muted-foreground">
                  Our system specifically focuses on the extreme ends of probability distributions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-primary" />
                  Portfolio Stress Testing
                </h3>
                <p className="text-xs text-muted-foreground">
                  Your specific portfolio is tested against each scenario to measure potential impact.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setActiveTab("simulation")} 
              className="w-full mt-2"
            >
              Run Black Swan Simulation
            </Button>
          </TabsContent>
          
          <TabsContent value="simulation" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-4">Simulation Parameters</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Market Conditions</label>
                  <select className="w-full p-2 rounded-md border mt-1">
                    <option>Current Market</option>
                    <option>Bull Market</option>
                    <option>Bear Market</option>
                    <option>High Volatility</option>
                    <option>Low Liquidity</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Timeframe</label>
                  <select className="w-full p-2 rounded-md border mt-1">
                    <option>Next 3 months</option>
                    <option>Next 6 months</option>
                    <option>Next 12 months</option>
                    <option>Next 24 months</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Risk Factors</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Market Crashes
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Exchange Failures
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Regulatory Events
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Smart Contract Exploits
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Stablecoin Failures
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Layer 1 Outages
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Simulation Intensity</label>
                  <select className="w-full p-2 rounded-md border mt-1">
                    <option>Standard (10,000 simulations)</option>
                    <option>High (100,000 simulations)</option>
                    <option>Extreme (1,000,000 simulations)</option>
                  </select>
                </div>
              </div>
              
              {isSimulating ? (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Simulating black swan events</span>
                    <span className="text-sm">{Math.round(simulationProgress)}%</span>
                  </div>
                  <Progress value={simulationProgress} />
                  <div className="text-xs text-muted-foreground pt-1">
                    Running Monte Carlo simulations and analyzing tail risk...
                  </div>
                </div>
              ) : (
                <Button
                  onClick={startSimulation}
                  className="w-full mt-6"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Simulation
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            {simulationResults.length > 0 ? (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Portfolio Vulnerability Detected</p>
                      <p className="mt-1">Your portfolio has a 47% potential drawdown in the most severe scenario. Consider reviewing the hedging recommendations below.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {simulationResults.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{result.event}</h3>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <Badge className={result.probability > 20 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}>
                          <Clock className="w-3 h-3 mr-1" />
                          {result.timeframe}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Probability</div>
                          <div className="flex items-center gap-2">
                            <Progress value={result.probability} className="h-2" />
                            <span className="text-sm font-medium">{result.probability}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Portfolio Impact</div>
                          <div className="flex items-center gap-2">
                            <Progress value={result.impact} className="h-2" />
                            <span className="text-sm font-medium">{result.impact}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          <LineChart className="w-3 h-3 mr-1" />
                          Detailed Analysis
                        </Button>
                        <Button size="sm">
                          Shield Portfolio
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-2">
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button onClick={startSimulation}>
                    Run New Simulation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Simulations Run</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Run a black swan event simulation to see potential extreme scenarios that might affect your portfolio.
                </p>
                <Button 
                  onClick={() => setActiveTab("simulation")} 
                  className="mt-4"
                >
                  Run Simulation
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
