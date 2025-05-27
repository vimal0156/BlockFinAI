
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { useWeb3 } from "@/lib/web3";
import { useToast } from "@/hooks/use-toast";

const supportedTokens = {
  '1': ['ETH', 'USDT', 'USDC'],
  '56': ['BNB', 'BUSD', 'USDT'],
  '137': ['MATIC', 'USDC', 'USDT'],
  '43114': ['AVAX', 'USDC', 'USDT'],
};

export function CrossChainSwap() {
  const { estimateCrossChainSwap, executeCrossChainSwap } = useWeb3();
  const { toast } = useToast();
  const [fromChain, setFromChain] = useState('1');
  const [toChain, setToChain] = useState('56');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('BNB');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState('');

  const handleEstimate = async () => {
    if (!amount) return;
    
    setIsEstimating(true);
    try {
      const estimate = await estimateCrossChainSwap({
        fromChain,
        toChain,
        fromToken,
        toToken,
        amount,
        slippage,
      });
      setEstimatedGas(estimate.estimatedGas);
      toast({
        title: "Estimate Ready",
        description: `Estimated gas: ${estimate.estimatedGas} ${fromToken}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Estimation Failed",
        description: "Failed to estimate swap",
      });
    } finally {
      setIsEstimating(false);
    }
  };

  const handleSwap = async () => {
    if (!amount || !estimatedGas) return;

    try {
      const txHash = await executeCrossChainSwap({
        fromChain,
        toChain,
        fromToken,
        toToken,
        amount,
        estimatedGas,
        slippage,
      });
      toast({
        title: "Swap Initiated",
        description: `Transaction hash: ${txHash}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Swap Failed",
        description: "Failed to execute swap",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Chain Swap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">From</label>
            <div className="flex gap-2">
              <Select value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(supportedTokens).map((chainId) => (
                    <SelectItem key={chainId} value={chainId}>
                      {chainId === '1' ? 'Ethereum' : 
                       chainId === '56' ? 'BNB Chain' :
                       chainId === '137' ? 'Polygon' : 'Avalanche'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {supportedTokens[fromChain as keyof typeof supportedTokens].map((token) => (
                    <SelectItem key={token} value={token}>
                      {token}
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
            <Button variant="ghost" size="icon" onClick={() => {
              setFromChain(toChain);
              setToChain(fromChain);
              setFromToken(toToken);
              setToToken(fromToken);
            }}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">To</label>
            <div className="flex gap-2">
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(supportedTokens).map((chainId) => (
                    <SelectItem key={chainId} value={chainId}>
                      {chainId === '1' ? 'Ethereum' : 
                       chainId === '56' ? 'BNB Chain' :
                       chainId === '137' ? 'Polygon' : 'Avalanche'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {supportedTokens[toChain as keyof typeof supportedTokens].map((token) => (
                    <SelectItem key={token} value={token}>
                      {token}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Slippage Tolerance (%)</label>
            <Input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              min="0.1"
              max="5"
              step="0.1"
            />
          </div>

          {estimatedGas && (
            <div className="text-sm text-muted-foreground">
              Estimated Gas: {estimatedGas} {fromToken}
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              variant="outline" 
              onClick={handleEstimate}
              disabled={isEstimating || !amount}
            >
              {isEstimating ? "Estimating..." : "Get Estimate"}
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSwap}
              disabled={!estimatedGas || !amount}
            >
              Swap
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
