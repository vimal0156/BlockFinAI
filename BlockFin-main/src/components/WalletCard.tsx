import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, TrendingDown } from "lucide-react";

interface WalletCardProps {
  currency: string;
  balance: number;
  symbol: string;
  change24h?: number;
}

export function WalletCard({ currency, balance, symbol, change24h }: WalletCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{currency}</CardTitle>
        <div className="flex items-center space-x-2">
          {change24h !== undefined && (
            <div className={`flex items-center ${change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-xs font-medium">
                {change24h >= 0 ? "+" : ""}{change24h}%
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {symbol}{balance.toLocaleString()}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Send
          </Button>
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
            <ArrowDownLeft className="w-4 h-4 mr-1" />
            Receive
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}