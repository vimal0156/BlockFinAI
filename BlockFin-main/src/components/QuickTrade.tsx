
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Coins, 
  ChevronsUpDown, 
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/lib/web3";

interface QuickTradeProps {
  className?: string;
}

export function QuickTrade({ className }: QuickTradeProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeTab, setTradeTab] = useState('market');
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();
  const { predictFee } = useWeb3();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleExecuteTrade = async () => {
    if (!amount || (tradeTab === 'limit' && !price)) {
      toast({
        title: "Invalid Input",
        description: "Please enter all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fees = await predictFee();
      
      toast({
        title: "Trade Executed",
        description: `Successfully placed ${tradeType} order for ${amount} ${asset} at ${tradeTab === 'market' ? 'market price' : `$${price}`}. Fee: ${fees.medium} ETH`,
      });
      
      // Reset form after successful trade
      if (tradeTab === 'market') {
        setAmount('');
      }
    } catch (error) {
      toast({
        title: "Trade Failed",
        description: "Failed to execute trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleQuickBuy = (percentage: number) => {
    // Assuming max available balance is $10,000 for demo
    const maxBalance = 10000;
    const calculatedAmount = (maxBalance * percentage / 100).toFixed(2);
    setAmount(calculatedAmount);
    setTradeType('buy');
  };

  const handleQuickSell = (percentage: number) => {
    // Assuming current holding is 1 BTC for demo
    const currentHolding = 1;
    const calculatedAmount = (currentHolding * percentage / 100).toFixed(6);
    setAmount(calculatedAmount);
    setTradeType('sell');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChevronsUpDown className="h-5 w-5" />
            <span>Quick Trade</span>
          </div>
          <Badge variant={tradeType === 'buy' ? 'default' : 'destructive'}>
            {tradeType === 'buy' ? 'BUY' : 'SELL'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button 
            variant={tradeType === 'buy' ? 'default' : 'outline'} 
            onClick={() => setTradeType('buy')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Buy
          </Button>
          <Button 
            variant={tradeType === 'sell' ? 'destructive' : 'outline'} 
            onClick={() => setTradeType('sell')}
            className="flex items-center gap-2"
          >
            <TrendingDown className="h-4 w-4" />
            Sell
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <div className="bg-muted p-2 rounded-lg">
              <Coins className="h-5 w-5" />
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
              <Button variant="outline" size="sm" className={asset === 'BTC' ? 'border-primary text-primary' : ''} onClick={() => setAsset('BTC')}>
                BTC
              </Button>
              <Button variant="outline" size="sm" className={asset === 'ETH' ? 'border-primary text-primary' : ''} onClick={() => setAsset('ETH')}>
                ETH
              </Button>
              <Button variant="outline" size="sm" className={asset === 'USDT' ? 'border-primary text-primary' : ''} onClick={() => setAsset('USDT')}>
                USDT
              </Button>
            </div>
          </div>
          
          <Tabs value={tradeTab} onValueChange={setTradeTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="limit">Limit</TabsTrigger>
              <TabsTrigger value="stop">Stop</TabsTrigger>
            </TabsList>
            
            <TabsContent value="market" className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Amount ({tradeType === 'buy' ? 'USD' : asset})</label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {tradeType === 'buy' ? '$10,000.00' : '1.00000000 BTC'}
                  </span>
                </div>
                <Input 
                  placeholder={`Enter amount ${tradeType === 'buy' ? 'in USD' : `in ${asset}`}`}
                  value={amount}
                  onChange={handleAmountChange}
                  type="number"
                  min="0"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {tradeType === 'buy' ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(25)}>25%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(50)}>50%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(75)}>75%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(100)}>Max</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(25)}>25%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(50)}>50%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(75)}>75%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(100)}>All</Button>
                  </>
                )}
              </div>
              
              <div className="p-3 rounded-lg bg-muted/40 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Est. Price:</span> $65,421.00
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Fee:</span> 0.1%
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="limit" className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Limit Price (USD)</label>
                  <span className="text-xs text-muted-foreground">
                    Market: $65,421.00
                  </span>
                </div>
                <Input 
                  placeholder="Enter limit price"
                  value={price}
                  onChange={handlePriceChange}
                  type="number"
                  min="0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Amount ({tradeType === 'buy' ? 'USD' : asset})</label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {tradeType === 'buy' ? '$10,000.00' : '1.00000000 BTC'}
                  </span>
                </div>
                <Input 
                  placeholder={`Enter amount ${tradeType === 'buy' ? 'in USD' : `in ${asset}`}`}
                  value={amount}
                  onChange={handleAmountChange}
                  type="number"
                  min="0"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {tradeType === 'buy' ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(25)}>25%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(50)}>50%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(75)}>75%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickBuy(100)}>Max</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(25)}>25%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(50)}>50%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(75)}>75%</Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickSell(100)}>All</Button>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="stop" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Stop Price (USD)</label>
                  <span className="text-xs text-muted-foreground">
                    Market: $65,421.00
                  </span>
                </div>
                <Input 
                  placeholder="Enter stop price"
                  type="number"
                  min="0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Limit Price (USD)</label>
                </div>
                <Input 
                  placeholder="Enter limit price"
                  type="number"
                  min="0"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Amount ({tradeType === 'buy' ? 'USD' : asset})</label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {tradeType === 'buy' ? '$10,000.00' : '1.00000000 BTC'}
                  </span>
                </div>
                <Input 
                  placeholder={`Enter amount ${tradeType === 'buy' ? 'in USD' : `in ${asset}`}`}
                  value={amount}
                  onChange={handleAmountChange}
                  type="number"
                  min="0"
                />
              </div>
              
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <p>Stop orders are executed at market price once the stop price is reached.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleExecuteTrade} 
            className="w-full"
            disabled={isExecuting}
            variant={tradeType === 'buy' ? 'default' : 'destructive'}
          >
            {isExecuting ? 'Processing...' : tradeType === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground">
            <Wallet className="inline h-3 w-3 mr-1" />
            Trading fee: 0.10% | Settlement: Instant
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
