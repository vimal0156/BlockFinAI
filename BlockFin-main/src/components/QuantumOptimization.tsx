
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Workflow, LineChart, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuantumSolution {
  name: string;
  allocation: number;
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

export function QuantumOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("ibm");
  const [solutions, setSolutions] = useState<QuantumSolution[]>([]);
  const { toast } = useToast();

  const runOptimization = () => {
    setIsOptimizing(true);
    setProgress(0);
    setSolutions([]);
    
    // Simulate quantum optimization process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 5, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          generateMockSolutions();
          toast({
            title: "Quantum Optimization Complete",
            description: "Portfolio optimized with quantum algorithms",
          });
        }
        return newProgress;
      });
    }, 500);
  };

  const generateMockSolutions = () => {
    const assets = ["BTC", "ETH", "SOL", "ADA", "MATIC", "DOT", "AVAX", "LINK"];
    const solutions: QuantumSolution[] = [];
    
    // Generate mock portfolio allocations
    for (let i = 0; i < 5; i++) {
      solutions.push({
        name: `Solution ${i + 1}`,
        allocation: parseFloat((Math.random() * 20 + 80).toFixed(2)),
        expectedReturn: parseFloat((Math.random() * 15 + 10).toFixed(2)),
        volatility: parseFloat((Math.random() * 8 + 5).toFixed(2)),
        sharpeRatio: parseFloat((Math.random() * 1 + 1.5).toFixed(2))
      });
    }
    
    setSolutions(solutions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          Quantum Portfolio Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="ibm">IBM Qiskit</TabsTrigger>
            <TabsTrigger value="dwave">D-Wave Annealer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ibm" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              IBM Qiskit framework leverages gate-based quantum computers for portfolio optimization using QAOA (Quantum Approximate Optimization Algorithm).
            </div>
            <Button 
              onClick={runOptimization} 
              disabled={isOptimizing}
              className="w-full"
            >
              <Workflow className="mr-2 h-4 w-4" />
              Run QAOA Optimization
            </Button>
          </TabsContent>
          
          <TabsContent value="dwave" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              D-Wave quantum annealing solves portfolio optimization as a quadratic unconstrained binary optimization (QUBO) problem for efficient asset allocation.
            </div>
            <Button 
              onClick={runOptimization} 
              disabled={isOptimizing}
              className="w-full"
            >
              <Zap className="mr-2 h-4 w-4" />
              Run Quantum Annealing
            </Button>
          </TabsContent>
        </Tabs>
        
        {isOptimizing && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Optimization Progress</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {progress < 30 ? "Initializing quantum circuit..." : 
               progress < 60 ? "Running quantum simulation..." : 
               progress < 90 ? "Analyzing results..." : 
               "Finalizing optimal portfolio..."}
            </p>
          </div>
        )}
        
        {solutions.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Optimal Portfolio Solutions</h3>
              <Badge variant="outline" className="font-mono">Quantum-Enhanced</Badge>
            </div>
            <div className="space-y-2">
              {solutions.map((solution, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{solution.name}</span>
                    <Badge 
                      variant={solution.sharpeRatio > 2 ? "default" : "secondary"}
                      className="font-mono"
                    >
                      SR: {solution.sharpeRatio}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Efficiency</p>
                      <p className="font-medium">{solution.allocation}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Return</p>
                      <p className="font-medium text-green-600">+{solution.expectedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volatility</p>
                      <p className="font-medium text-amber-600">{solution.volatility}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
