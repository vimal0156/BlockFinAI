
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, BarChart2, Play, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BacktestResult {
  strategy: string;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  tradesCount: number;
}

export function BacktestEngine() {
  const [timeframe, setTimeframe] = useState<string>("1d");
  const [startDate, setStartDate] = useState<string>("2023-01-01");
  const [endDate, setEndDate] = useState<string>("2023-12-31");
  const [asset, setAsset] = useState<string>("BTC/USD");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAdvancedOptions, setIsAdvancedOptions] = useState<boolean>(false);
  const [riskTolerance, setRiskTolerance] = useState<number[]>([50]);
  const [results, setResults] = useState<BacktestResult[]>([]);
  const [customCode, setCustomCode] = useState<string>("// Custom trading strategy logic\nfunction analyze(data) {\n  // Simple moving average crossover\n  const shortSMA = calculateSMA(data, 10);\n  const longSMA = calculateSMA(data, 50);\n  \n  // Buy when short SMA crosses above long SMA\n  if (shortSMA > longSMA) {\n    return { action: 'buy', confidence: 0.8 };\n  }\n  \n  // Sell when short SMA crosses below long SMA\n  if (shortSMA < longSMA) {\n    return { action: 'sell', confidence: 0.7 };\n  }\n  \n  return { action: 'hold', confidence: 0.5 };\n}");
  const { toast } = useToast();

  const runBacktest = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      const mockResults: BacktestResult[] = [
        {
          strategy: "DQN Agent",
          totalReturn: 78.4,
          sharpeRatio: 1.82,
          maxDrawdown: 12.3,
          winRate: 67.8,
          tradesCount: 42
        },
        {
          strategy: "PPO Agent",
          totalReturn: 65.7,
          sharpeRatio: 1.65,
          maxDrawdown: 15.6,
          winRate: 63.5,
          tradesCount: 38
        },
        {
          strategy: "Custom Strategy",
          totalReturn: 42.1,
          sharpeRatio: 1.23,
          maxDrawdown: 18.2,
          winRate: 56.3,
          tradesCount: 35
        },
        {
          strategy: "Buy & Hold",
          totalReturn: 35.6,
          sharpeRatio: 0.95,
          maxDrawdown: 22.4,
          winRate: 100,
          tradesCount: 1
        }
      ];
      
      setResults(mockResults);
      setIsRunning(false);
      
      toast({
        title: "Backtest Complete",
        description: "All strategies have been evaluated against historical data",
      });
    }, 3000);
  };
  
  const resetBacktest = () => {
    setResults([]);
    toast({
      title: "Backtest Reset",
      description: "All results have been cleared",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          AI Backtest Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="asset">Trading Pair</Label>
              <Select value={asset} onValueChange={setAsset}>
                <SelectTrigger id="asset">
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

            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 minute</SelectItem>
                  <SelectItem value="5m">5 minutes</SelectItem>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="4h">4 hours</SelectItem>
                  <SelectItem value="1d">1 day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="advanced-options"
                checked={isAdvancedOptions}
                onCheckedChange={setIsAdvancedOptions}
              />
              <Label htmlFor="advanced-options">Advanced Options</Label>
            </div>
          </div>

          {isAdvancedOptions && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                  <span className="text-sm text-muted-foreground">{riskTolerance}%</span>
                </div>
                <Slider
                  id="risk-tolerance"
                  min={0}
                  max={100}
                  step={1}
                  value={riskTolerance}
                  onValueChange={setRiskTolerance}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-code">Custom Strategy Code</Label>
                <Textarea
                  id="custom-code"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="font-mono text-sm h-[200px]"
                />
              </div>
            </div>
          )}

          {!isAdvancedOptions && (
            <div className="flex flex-col justify-center items-center space-y-2 p-6 border rounded-lg">
              <p className="text-center text-muted-foreground">
                The backtest engine will evaluate multiple AI strategies against historical data to determine the optimal approach.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Deep Q-Network (DQN) Agent</li>
                <li>Proximal Policy Optimization (PPO) Agent</li>
                <li>Custom Strategy</li>
                <li>Buy & Hold Benchmark</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={runBacktest}
            disabled={isRunning}
            className="flex items-center"
          >
            {isRunning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Running Backtest...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Backtest
              </>
            )}
          </Button>
          <Button
            onClick={resetBacktest}
            variant="outline"
            disabled={results.length === 0}
          >
            Reset
          </Button>
        </div>

        {results.length > 0 && (
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-2">Backtest Results</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex items-center">
                    Strategy
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      Return %
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Sharpe</TableHead>
                  <TableHead className="text-right">Drawdown %</TableHead>
                  <TableHead className="text-right">Win Rate %</TableHead>
                  <TableHead className="text-right">Trades</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.strategy}</TableCell>
                    <TableCell className={`text-right ${result.totalReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.totalReturn > 0 ? '+' : ''}{result.totalReturn.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">{result.sharpeRatio.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-red-600">-{result.maxDrawdown.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">{result.winRate.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{result.tradesCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
