
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Coins, TrendingUp, Brain, MessageSquare, ChartLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/lib/web3";
import { Link } from "react-router-dom";
import { QuickTrade } from "@/components/QuickTrade";

interface ExchangeRate {
  pair: string;
  rate: number;
  change24h: number;
}

const mockExchangeRates: ExchangeRate[] = [
  { pair: "ETH/BTC", rate: 0.059, change24h: 2.5 },
  { pair: "BTC/USDT", rate: 65000, change24h: -1.2 },
  { pair: "ETH/USDT", rate: 3800, change24h: 1.8 },
];

const supportedCurrencies = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
];

export default function Exchange() {
  const [fromCurrency, setFromCurrency] = useState(supportedCurrencies[0].symbol);
  const [toCurrency, setToCurrency] = useState(supportedCurrencies[1].symbol);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const { toast } = useToast();
  const { predictFee } = useWeb3();

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleExchange = async () => {
    try {
      const fees = await predictFee();
      toast({
        title: "Exchange Initiated",
        description: `Converting ${amount} ${fromCurrency} to ${toCurrency}. Estimated fee: ${fees.medium} ETH`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Exchange Failed",
        description: "Failed to initiate exchange",
      });
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Exchange</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exchange Crypto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">From</label>
                <div className="flex gap-2">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCurrencies.map((currency) => (
                        <SelectItem key={currency.symbol} value={currency.symbol}>
                          {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" size="icon" onClick={handleSwap}>
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">To</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedCurrencies.map((currency) => (
                      <SelectItem key={currency.symbol} value={currency.symbol}>
                        {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Slippage Tolerance (%)</label>
                <Input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  min="0.1"
                  max="5"
                  step="0.1"
                />
              </div>

              <Button className="w-full" onClick={handleExchange}>
                Exchange
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockExchangeRates.map((rate) => (
                  <div key={rate.pair} className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4" />
                      <span>{rate.pair}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{rate.rate}</span>
                      <span className={`flex items-center ${rate.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendingUp className={`h-4 w-4 ${rate.change24h < 0 ? 'rotate-180' : ''}`} />
                        {Math.abs(rate.change24h)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Trading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Boost your trading with our AI-powered trading agents.
                </p>
                <Link to="/analytics">
                  <Button className="w-full">
                    Explore AI Trading
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartLine className="h-5 w-5" />
                  Chart Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze any chart image with our AI-powered ChartScan.
                </p>
                <Link to="/chart-scan">
                  <Button className="w-full bg-gradient-to-r from-primary to-indigo-600">
                    Try ChartScan AI
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <QuickTrade className="mt-4" />
        </div>
      </div>
    </div>
  );
}
