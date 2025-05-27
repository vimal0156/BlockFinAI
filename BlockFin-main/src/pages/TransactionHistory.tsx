
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownLeft, ArrowUpRight, ExternalLink, Filter, Search } from "lucide-react";
import { TransactionList } from "@/components/TransactionList";

interface DetailedTransaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  currency: string;
  symbol: string;
  date: string;
  status: "completed" | "pending" | "failed";
  from: string;
  to: string;
  txHash: string;
  network: string;
  fee: number;
  confirmations: number;
}

const mockDetailedTransactions: DetailedTransaction[] = [
  {
    id: "tx1",
    type: "send",
    amount: 0.25,
    currency: "Bitcoin",
    symbol: "₿",
    date: "2024-05-15T14:30:00",
    status: "completed",
    from: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    to: "bc1q9h6yzrprd7ah8h52m5hqzecfwdceqdxnpn3qjr",
    txHash: "0x7cf6eb1fbdd1cde3f67f2d439b15ee8cf7a9c710be05ca41da3f28cecc762378",
    network: "Bitcoin",
    fee: 0.00015,
    confirmations: 24
  },
  {
    id: "tx2",
    type: "receive",
    amount: 2.5,
    currency: "Ethereum",
    symbol: "Ξ",
    date: "2024-05-14T09:45:00",
    status: "completed",
    from: "0x742d35Cc6634C0532925a3b844Bc454e9438f44e",
    to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    txHash: "0x3cf6eb1fbdd1cde3f67f2d439b15ee8cf7a9c710be05ca41da3f28cecc762378",
    network: "Ethereum",
    fee: 0.005,
    confirmations: 65
  },
  {
    id: "tx3",
    type: "send",
    amount: 100,
    currency: "USDT",
    symbol: "$",
    date: "2024-05-12T16:20:00",
    status: "completed",
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x123d35Cc6634C0532925a3b844Bc454e4438f789",
    txHash: "0x1cf6eb1fbdd1cde3f67f2d439b15ee8cf7a9c710be05ca41da3f28cecc762378",
    network: "Ethereum",
    fee: 0.002,
    confirmations: 120
  },
  {
    id: "tx4",
    type: "receive",
    amount: 0.5,
    currency: "Bitcoin",
    symbol: "₿",
    date: "2024-05-10T11:15:00",
    status: "completed",
    from: "bc1q9h6yzrprd7ah8h52m5hqzecfwdceqdxnpn3qjr",
    to: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    txHash: "0x2cf6eb1fbdd1cde3f67f2d439b15ee8cf7a9c710be05ca41da3f28cecc762378",
    network: "Bitcoin",
    fee: 0.0001,
    confirmations: 312
  },
  {
    id: "tx5",
    type: "send",
    amount: 1000,
    currency: "USDT",
    symbol: "$",
    date: "2024-05-05T13:20:00",
    status: "pending",
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x456d35Cc6634C0532925a3b844Bc454e4438f123",
    txHash: "0x5cf6eb1fbdd1cde3f67f2d439b15ee8cf7a9c710be05ca41da3f28cecc762378",
    network: "Ethereum",
    fee: 0.003,
    confirmations: 1
  },
  {
    id: "tx6",
    type: "send",
    amount: 0.1,
    currency: "Ethereum",
    symbol: "Ξ",
    date: "2024-05-01T10:30:00",
    status: "failed",
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x789d35Cc6634C0532925a3b844Bc454e4438f321",
    txHash: "0x6cf6eb1fbdd1cde3f67f2d439b15ee8cf7a9c710be05ca41da3f28cecc762378",
    network: "Ethereum",
    fee: 0.001,
    confirmations: 0
  },
];

const formatTransactionForList = (transactions: DetailedTransaction[]) => {
  return transactions.map(tx => ({
    id: tx.id,
    type: tx.type,
    amount: tx.amount,
    currency: tx.currency,
    symbol: tx.symbol,
    date: tx.date,
    status: tx.status
  }));
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(mockDetailedTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<DetailedTransaction | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
    type: "all",
    status: "all",
    currency: "all"
  });

  const handleSearch = () => {
    if (!searchQuery) {
      setTransactions(mockDetailedTransactions);
      return;
    }

    const filtered = mockDetailedTransactions.filter(tx => 
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setTransactions(filtered);
  };

  const applyFilters = () => {
    let filtered = [...mockDetailedTransactions];

    if (filters.dateFrom) {
      filtered = filtered.filter(tx => new Date(tx.date) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(tx => new Date(tx.date) <= new Date(filters.dateTo));
    }

    if (filters.amountMin) {
      filtered = filtered.filter(tx => tx.amount >= Number(filters.amountMin));
    }

    if (filters.amountMax) {
      filtered = filtered.filter(tx => tx.amount <= Number(filters.amountMax));
    }

    if (filters.type !== "all") {
      filtered = filtered.filter(tx => tx.type === filters.type);
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(tx => tx.status === filters.status);
    }

    if (filters.currency !== "all") {
      filtered = filtered.filter(tx => tx.currency.toLowerCase() === filters.currency.toLowerCase());
    }

    setTransactions(filtered);
    setFilterModalOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      amountMin: "",
      amountMax: "",
      type: "all",
      status: "all",
      currency: "all"
    });
    setTransactions(mockDetailedTransactions);
    setFilterModalOpen(false);
  };

  const viewTransactionDetails = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (tx) {
      setSelectedTransaction(tx);
    }
  };

  const getExplorerLink = (hash: string, network: string) => {
    switch (network.toLowerCase()) {
      case 'bitcoin':
        return `https://www.blockchain.com/explorer/transactions/btc/${hash}`;
      case 'ethereum':
        return `https://etherscan.io/tx/${hash}`;
      default:
        return `#`;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Transaction History</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by hash, address..."
              className="pl-8 w-[250px] md:w-[350px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="outline" onClick={() => setFilterModalOpen(!filterModalOpen)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {filterModalOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date From</label>
                <Input 
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date To</label>
                <Input 
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Min Amount</label>
                <Input 
                  type="number"
                  placeholder="Minimum amount"
                  value={filters.amountMin}
                  onChange={(e) => setFilters({...filters, amountMin: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Amount</label>
                <Input 
                  type="number"
                  placeholder="Maximum amount"
                  value={filters.amountMax}
                  onChange={(e) => setFilters({...filters, amountMax: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select 
                  value={filters.type}
                  onValueChange={(value) => setFilters({...filters, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="send">Send</SelectItem>
                    <SelectItem value="receive">Receive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={filters.status}
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <Select 
                  value={filters.currency}
                  onValueChange={(value) => setFilters({...filters, currency: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All currencies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All currencies</SelectItem>
                    <SelectItem value="bitcoin">Bitcoin</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={resetFilters}>Reset</Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TransactionList
            transactions={formatTransactionForList(transactions)}
          />
        </TabsContent>

        <TabsContent value="sent">
          <TransactionList
            transactions={formatTransactionForList(transactions.filter(t => t.type === "send"))}
          />
        </TabsContent>

        <TabsContent value="received">
          <TransactionList
            transactions={formatTransactionForList(transactions.filter(t => t.type === "receive"))}
          />
        </TabsContent>

        <TabsContent value="pending">
          <TransactionList
            transactions={formatTransactionForList(transactions.filter(t => t.status === "pending"))}
          />
        </TabsContent>
      </Tabs>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Transaction Details</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(null)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className={`flex items-center font-medium ${
                  selectedTransaction.type === "send" ? "text-red-500" : "text-green-500"
                }`}>
                  {selectedTransaction.type === "send" ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 mr-1" />
                  )}
                  {selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {selectedTransaction.symbol}{selectedTransaction.amount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Date & Time</span>
                <span className="font-medium">
                  {new Date(selectedTransaction.date).toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Status</span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    selectedTransaction.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : selectedTransaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Network</span>
                <span className="font-medium">{selectedTransaction.network}</span>
              </div>
              
              <div className="flex flex-col pb-2 border-b">
                <span className="text-sm text-muted-foreground mb-1">From</span>
                <span className="font-mono text-xs break-all">{selectedTransaction.from}</span>
              </div>
              
              <div className="flex flex-col pb-2 border-b">
                <span className="text-sm text-muted-foreground mb-1">To</span>
                <span className="font-mono text-xs break-all">{selectedTransaction.to}</span>
              </div>
              
              <div className="flex flex-col pb-2 border-b">
                <span className="text-sm text-muted-foreground mb-1">Transaction Hash</span>
                <span className="font-mono text-xs break-all">{selectedTransaction.txHash}</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Fee</span>
                <span className="font-medium">
                  {selectedTransaction.symbol}{selectedTransaction.fee.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm text-muted-foreground">Confirmations</span>
                <span className="font-medium">{selectedTransaction.confirmations}</span>
              </div>
              
              <div className="pt-2">
                <a 
                  href={getExplorerLink(selectedTransaction.txHash, selectedTransaction.network)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  View on Blockchain Explorer
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
