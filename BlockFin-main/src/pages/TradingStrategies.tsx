
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeDollarSign, Clock, LineChart, Flame, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TradingStrategies = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <BrainCircuit className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
          Trading Strategies
        </h1>
      </div>
      
      <Tabs defaultValue="price-action" className="space-y-8">
        <TabsList className="grid grid-cols-3 max-w-lg bg-background/80 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="price-action" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            Price Action
          </TabsTrigger>
          <TabsTrigger value="swing" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Swing Trading
          </TabsTrigger>
          <TabsTrigger value="momentum" className="flex items-center gap-1">
            <Flame className="h-4 w-4" />
            Momentum
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="price-action">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Price Action Trading</CardTitle>
              <CardDescription>
                Trading based on price movements without indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {priceActionStrategies.map((strategy) => (
                  <Card key={strategy.name} className="overflow-hidden border-primary/10">
                    <div className="p-2 bg-primary/5">
                      <h3 className="font-medium">{strategy.name}</h3>
                    </div>
                    <CardContent className="p-4 text-sm space-y-3">
                      <p>{strategy.description}</p>
                      <div className="text-xs">
                        <span className="font-medium">Timeframe: </span>
                        {strategy.timeframe}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Success rate: </span>
                        <span className={strategy.successRate > 60 ? "text-green-600" : "text-amber-600"}>
                          {strategy.successRate}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => navigate("/stock-analysis")}
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Analyze Your Chart Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="swing">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Swing Trading Strategies</CardTitle>
              <CardDescription>
                Capturing medium-term "swings" in market trends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {swingStrategies.map((strategy) => (
                  <Card key={strategy.name} className="overflow-hidden border-primary/10">
                    <div className="p-2 bg-primary/5">
                      <h3 className="font-medium">{strategy.name}</h3>
                    </div>
                    <CardContent className="p-4 text-sm space-y-3">
                      <p>{strategy.description}</p>
                      <div className="text-xs">
                        <span className="font-medium">Timeframe: </span>
                        {strategy.timeframe}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Success rate: </span>
                        <span className={strategy.successRate > 60 ? "text-green-600" : "text-amber-600"}>
                          {strategy.successRate}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => navigate("/advanced-patterns")}
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
                >
                  <BadgeDollarSign className="mr-2 h-4 w-4" />
                  Explore Advanced Patterns
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="momentum">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Momentum Trading Strategies</CardTitle>
              <CardDescription>
                Capitalizing on strong price movements in a particular direction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {momentumStrategies.map((strategy) => (
                  <Card key={strategy.name} className="overflow-hidden border-primary/10">
                    <div className="p-2 bg-primary/5">
                      <h3 className="font-medium">{strategy.name}</h3>
                    </div>
                    <CardContent className="p-4 text-sm space-y-3">
                      <p>{strategy.description}</p>
                      <div className="text-xs">
                        <span className="font-medium">Timeframe: </span>
                        {strategy.timeframe}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Success rate: </span>
                        <span className={strategy.successRate > 60 ? "text-green-600" : "text-amber-600"}>
                          {strategy.successRate}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => navigate("/stock-analysis")}
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
                >
                  <Flame className="mr-2 h-4 w-4" />
                  Analyze Chart Momentum
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Strategy data
const priceActionStrategies = [
  {
    name: "Support and Resistance",
    description: "Trading bounces off established support or resistance levels, looking for reversals or breakouts.",
    timeframe: "Any timeframe",
    successRate: 68
  },
  {
    name: "Inside Bar Strategy",
    description: "Trading breakouts from inside bars, which form when a bar's range is completely within the previous bar's range.",
    timeframe: "Daily charts",
    successRate: 63
  },
  {
    name: "Pin Bar Strategy",
    description: "Trading reversal signals from pin bars, which have long wicks and small bodies indicating rejection of price.",
    timeframe: "4H and Daily charts",
    successRate: 71
  },
  {
    name: "Engulfing Pattern",
    description: "Trading reversal signals from engulfing candles, where one candle completely engulfs the previous candle.",
    timeframe: "Daily charts",
    successRate: 65
  },
  {
    name: "Breakout Trading",
    description: "Trading breakouts from key levels, trendlines, or chart patterns with confirmation.",
    timeframe: "Any timeframe",
    successRate: 59
  },
  {
    name: "Fibonacci Retracement",
    description: "Trading retracements to key Fibonacci levels (38.2%, 50%, 61.8%) in the direction of the trend.",
    timeframe: "4H and higher",
    successRate: 64
  }
];

const swingStrategies = [
  {
    name: "Moving Average Crossover",
    description: "Trading when a faster moving average crosses above or below a slower moving average.",
    timeframe: "Daily charts",
    successRate: 61
  },
  {
    name: "RSI Divergence",
    description: "Trading divergences between price action and RSI, signaling potential reversals.",
    timeframe: "4H and Daily charts",
    successRate: 67
  },
  {
    name: "Pullback Trading",
    description: "Entering trades during retracements in the direction of the overall trend.",
    timeframe: "Daily charts",
    successRate: 73
  },
  {
    name: "Cup and Handle",
    description: "Trading breakouts from cup and handle patterns which form after a significant uptrend.",
    timeframe: "Daily and Weekly charts",
    successRate: 69
  },
  {
    name: "Channel Trading",
    description: "Trading bounces between the upper and lower boundaries of price channels.",
    timeframe: "4H and Daily charts",
    successRate: 65
  },
  {
    name: "Volatility Breakout",
    description: "Trading breakouts after periods of low volatility, often using Bollinger Bands.",
    timeframe: "Daily charts",
    successRate: 58
  }
];

const momentumStrategies = [
  {
    name: "Gap and Go",
    description: "Trading stocks that gap up or down at market open, riding the momentum that follows.",
    timeframe: "5min and 15min charts",
    successRate: 62
  },
  {
    name: "Relative Strength",
    description: "Trading stocks showing relative strength compared to the broader market or sector.",
    timeframe: "Daily charts",
    successRate: 66
  },
  {
    name: "MACD Histogram",
    description: "Trading when the MACD histogram increases or decreases in height, indicating shifting momentum.",
    timeframe: "15min and 1H charts",
    successRate: 59
  },
  {
    name: "Volume Breakout",
    description: "Trading breakouts that occur with significantly higher than average volume.",
    timeframe: "Any timeframe",
    successRate: 68
  },
  {
    name: "Moving Average Bounce",
    description: "Trading bounces off key moving averages when price is in a strong trend.",
    timeframe: "1H and 4H charts",
    successRate: 64
  },
  {
    name: "Momentum Divergence",
    description: "Trading when price makes new highs/lows but momentum indicators fail to confirm.",
    timeframe: "1H and 4H charts",
    successRate: 71
  }
];

export default TradingStrategies;
