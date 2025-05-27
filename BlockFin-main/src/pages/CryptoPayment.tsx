import { useState } from "react";
import { CryptoPaymentMethod } from "@/components/CryptoPaymentMethod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cryptoCurrencies = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    exchangeRate: 65000,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    exchangeRate: 3500,
  },
  {
    name: "USDT",
    symbol: "USDT",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    exchangeRate: 1,
  },
];

export default function CryptoPayment() {
  const [amount] = useState(100); // This would typically come from your payment context/props

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-4xl font-bold mb-8">Crypto Payment</h1>
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={cryptoCurrencies[0].symbol.toLowerCase()} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {cryptoCurrencies.map((crypto) => (
                <TabsTrigger
                  key={crypto.symbol}
                  value={crypto.symbol.toLowerCase()}
                  className="flex items-center gap-2"
                >
                  <img src={crypto.icon} alt={crypto.name} className="w-5 h-5" />
                  {crypto.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {cryptoCurrencies.map((crypto) => (
              <TabsContent key={crypto.symbol} value={crypto.symbol.toLowerCase()}>
                <CryptoPaymentMethod
                  cryptoName={crypto.name}
                  address={crypto.address}
                  icon={crypto.icon}
                  amount={amount}
                  exchangeRate={crypto.exchangeRate}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}