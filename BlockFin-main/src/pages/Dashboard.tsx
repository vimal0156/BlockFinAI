import { WalletCard } from "@/components/WalletCard";
import { TransactionList } from "@/components/TransactionList";
import { TokenizedAssetCard } from "@/components/TokenizedAssetCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const mockTransactions = [
  {
    id: "1",
    type: "send" as const,
    amount: 1500,
    currency: "US Dollar",
    symbol: "$",
    date: "2024-03-20",
    status: "completed" as const,
  },
  {
    id: "2",
    type: "receive" as const,
    amount: 2000,
    currency: "US Dollar",
    symbol: "$",
    date: "2024-03-19",
    status: "completed" as const,
  },
  {
    id: "3",
    type: "send" as const,
    amount: 500,
    currency: "Euro",
    symbol: "€",
    date: "2024-03-18",
    status: "pending" as const,
  },
];

const mockAssets = [
  {
    name: "Manhattan Real Estate Fund",
    symbol: "MRE",
    price: 250000,
    priceSymbol: "$",
    type: "Real Estate",
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600",
  },
  {
    name: "Digital Art Collection",
    symbol: "DAC",
    price: 15000,
    priceSymbol: "$",
    type: "Art",
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>
        
        <div className="grid gap-6 mb-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Wallets</h2>
              <Button variant="ghost" asChild>
                <Link to="/wallet" className="gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <WalletCard
                currency="US Dollar"
                balance={50000}
                symbol="$"
                change24h={2.5}
              />
              <WalletCard
                currency="Euro"
                balance={42000}
                symbol="€"
                change24h={-1.2}
              />
              <WalletCard
                currency="Bitcoin"
                balance={2.5}
                symbol="₿"
                change24h={5.7}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tokenized Assets</h2>
              <Button variant="ghost" asChild>
                <Link to="/assets" className="gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockAssets.map((asset, index) => (
                <TokenizedAssetCard key={index} {...asset} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button variant="ghost" asChild>
                <Link to="/transactions" className="gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <TransactionList transactions={mockTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;