
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2, TrendingUp, TrendingDown, BookOpen } from "lucide-react";

const AdvancedPatterns = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <BarChart2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
          Advanced Chart Patterns
        </h1>
      </div>
      
      <Tabs defaultValue="reversal" className="space-y-8">
        <TabsList className="grid grid-cols-3 max-w-lg bg-background/80 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="reversal" className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4" />
            Reversal Patterns
          </TabsTrigger>
          <TabsTrigger value="continuation" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Continuation Patterns
          </TabsTrigger>
          <TabsTrigger value="indicators" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Key Indicators
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reversal">
          <Card>
            <CardHeader>
              <CardTitle>Reversal Chart Patterns</CardTitle>
              <CardDescription>
                These patterns signal a potential change in trend direction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pattern</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reversalPatterns.map((pattern) => (
                    <TableRow key={pattern.name}>
                      <TableCell className="font-medium">{pattern.name}</TableCell>
                      <TableCell>{pattern.description}</TableCell>
                      <TableCell>
                        <span className={pattern.signal === "Bullish" ? "text-green-600" : "text-red-600"}>
                          {pattern.signal}
                        </span>
                      </TableCell>
                      <TableCell>{pattern.successRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="continuation">
          <Card>
            <CardHeader>
              <CardTitle>Continuation Chart Patterns</CardTitle>
              <CardDescription>
                These patterns signal a temporary pause in the current trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pattern</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {continuationPatterns.map((pattern) => (
                    <TableRow key={pattern.name}>
                      <TableCell className="font-medium">{pattern.name}</TableCell>
                      <TableCell>{pattern.description}</TableCell>
                      <TableCell>
                        <span className={pattern.signal === "Bullish" ? "text-green-600" : "text-red-600"}>
                          {pattern.signal}
                        </span>
                      </TableCell>
                      <TableCell>{pattern.successRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="indicators">
          <Card>
            <CardHeader>
              <CardTitle>Technical Indicators</CardTitle>
              <CardDescription>
                Popular indicators used alongside chart patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicator</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Best Used For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicators.map((indicator) => (
                    <TableRow key={indicator.name}>
                      <TableCell className="font-medium">{indicator.name}</TableCell>
                      <TableCell>{indicator.type}</TableCell>
                      <TableCell>{indicator.description}</TableCell>
                      <TableCell>{indicator.bestUsedFor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Data for the tables
const reversalPatterns = [
  {
    name: "Head and Shoulders",
    description: "Three peaks with the middle peak being the highest",
    signal: "Bearish",
    successRate: "83%"
  },
  {
    name: "Inverse Head and Shoulders",
    description: "Three troughs with the middle trough being the lowest",
    signal: "Bullish",
    successRate: "79%"
  },
  {
    name: "Double Top",
    description: "Two peaks at approximately the same price level",
    signal: "Bearish",
    successRate: "78%"
  },
  {
    name: "Double Bottom",
    description: "Two troughs at approximately the same price level",
    signal: "Bullish",
    successRate: "75%"
  },
  {
    name: "Triple Top",
    description: "Three peaks at approximately the same price level",
    signal: "Bearish",
    successRate: "72%"
  },
  {
    name: "Triple Bottom",
    description: "Three troughs at approximately the same price level",
    signal: "Bullish",
    successRate: "70%"
  }
];

const continuationPatterns = [
  {
    name: "Bull Flag",
    description: "Short-term downtrend (flag) following a sharp uptrend (pole)",
    signal: "Bullish",
    successRate: "82%"
  },
  {
    name: "Bear Flag",
    description: "Short-term uptrend (flag) following a sharp downtrend (pole)",
    signal: "Bearish",
    successRate: "78%"
  },
  {
    name: "Bull Pennant",
    description: "Converging trendlines following a sharp uptrend",
    signal: "Bullish",
    successRate: "77%"
  },
  {
    name: "Bear Pennant",
    description: "Converging trendlines following a sharp downtrend",
    signal: "Bearish",
    successRate: "75%"
  },
  {
    name: "Rectangle",
    description: "Price contained between parallel support and resistance",
    signal: "Neutral",
    successRate: "68%"
  },
  {
    name: "Cup and Handle",
    description: "U-shaped cup followed by a small downward drift",
    signal: "Bullish",
    successRate: "83%"
  }
];

const indicators = [
  {
    name: "MACD",
    type: "Momentum",
    description: "Moving Average Convergence Divergence shows relationship between two moving averages",
    bestUsedFor: "Trend direction and momentum"
  },
  {
    name: "RSI",
    type: "Momentum",
    description: "Relative Strength Index measures speed and change of price movements",
    bestUsedFor: "Overbought/oversold conditions"
  },
  {
    name: "Bollinger Bands",
    type: "Volatility",
    description: "Moving average with two standard deviation bands",
    bestUsedFor: "Volatility and potential reversals"
  },
  {
    name: "Fibonacci Retracement",
    type: "Retracement",
    description: "Horizontal lines indicating potential support/resistance at key Fibonacci levels",
    bestUsedFor: "Identifying potential reversal points"
  },
  {
    name: "Moving Averages",
    type: "Trend",
    description: "Average of prices over specified time periods",
    bestUsedFor: "Trend direction and support/resistance"
  }
];

export default AdvancedPatterns;
