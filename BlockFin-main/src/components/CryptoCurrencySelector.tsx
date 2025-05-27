
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bitcoin, Coins } from "lucide-react";

interface CryptoCurrency {
  name: string;
  symbol: string;
  icon: React.ReactNode;
}

interface CryptoCurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const CryptoCurrencySelector = ({
  value,
  onChange,
  label = "Select Currency",
}: CryptoCurrencySelectorProps) => {
  const cryptocurrencies: CryptoCurrency[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      icon: <Coins className="h-4 w-4 text-purple-500" />,
    },
    {
      name: "USDT",
      symbol: "USDT",
      icon: <Coins className="h-4 w-4 text-green-500" />,
    },
    {
      name: "BNB",
      symbol: "BNB",
      icon: <Coins className="h-4 w-4 text-yellow-500" />,
    },
    {
      name: "XRP",
      symbol: "XRP",
      icon: <Coins className="h-4 w-4 text-blue-500" />,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      icon: <Coins className="h-4 w-4 text-sky-500" />,
    },
  ];

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a cryptocurrency" />
        </SelectTrigger>
        <SelectContent>
          {cryptocurrencies.map((crypto) => (
            <SelectItem key={crypto.symbol} value={crypto.symbol} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {crypto.icon}
                <span>{crypto.name} ({crypto.symbol})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
