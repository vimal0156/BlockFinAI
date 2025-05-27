import { TransactionList } from "@/components/TransactionList";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  {
    id: "4",
    type: "receive" as const,
    amount: 3000,
    currency: "Bitcoin",
    symbol: "₿",
    date: "2024-03-17",
    status: "completed" as const,
  },
];

const Transactions = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-primary mb-8">Transactions</h1>
      <Card className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <TransactionList transactions={mockTransactions} />
          </TabsContent>
          <TabsContent value="sent">
            <TransactionList
              transactions={mockTransactions.filter((t) => t.type === "send")}
            />
          </TabsContent>
          <TabsContent value="received">
            <TransactionList
              transactions={mockTransactions.filter((t) => t.type === "receive")}
            />
          </TabsContent>
          <TabsContent value="pending">
            <TransactionList
              transactions={mockTransactions.filter((t) => t.status === "pending")}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Transactions;