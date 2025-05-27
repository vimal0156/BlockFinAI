import { useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { QRCodeHandler } from "@/components/QRCodeHandler";
import { TransactionList } from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeb3 } from "@/lib/web3";
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Key, QrCode, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockTransactions = [
  {
    id: "1",
    type: "send" as const,
    amount: 1.5,
    currency: "Bitcoin",
    symbol: "₿",
    date: new Date().toISOString(),
    status: "completed" as const,
  },
  {
    id: "2",
    type: "receive" as const,
    amount: 2.0,
    currency: "Ethereum",
    symbol: "Ξ",
    date: new Date().toISOString(),
    status: "completed" as const,
  },
];

const mockWallets = [
  {
    currency: "Bitcoin",
    balance: 2.5,
    symbol: "₿",
    change24h: 5.7,
  },
  {
    currency: "Ethereum",
    balance: 15.8,
    symbol: "Ξ",
    change24h: 3.2,
  },
  {
    currency: "USDT",
    balance: 5000,
    symbol: "$",
    change24h: 0.1,
  },
];

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showQR, setShowQR] = useState(false);
  const { account, importWallet, exportWallet } = useWeb3();
  const { toast } = useToast();

  const handleImportWallet = async () => {
    try {
      await importWallet("mock_private_key");
      toast({
        title: "Wallet Imported",
        description: "Your wallet has been successfully imported",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "Failed to import wallet",
      });
    }
  };

  const handleExportWallet = async () => {
    try {
      const privateKey = await exportWallet();
      toast({
        title: "Wallet Exported",
        description: "Your private key has been generated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export wallet",
      });
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Wallet</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2" onClick={handleImportWallet}>
            <Key className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExportWallet}>
            <Key className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="receive">Receive</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockWallets.map((wallet, index) => (
              <WalletCard key={index} {...wallet} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send Crypto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6">
                <Button variant="outline" className="gap-2" onClick={() => setShowQR(true)}>
                  <QrCode className="w-4 h-4" />
                  Scan QR Code
                </Button>
                {showQR && (
                  <QRCodeHandler
                    address={account || ""}
                    onScan={(data) => {
                      toast({
                        title: "QR Code Scanned",
                        description: `Address: ${data}`,
                      });
                      setShowQR(false);
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receive">
          <Card>
            <CardHeader>
              <CardTitle>Receive Crypto</CardTitle>
            </CardHeader>
            <CardContent>
              <QRCodeHandler
                address={account || ""}
                onScan={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <TransactionList transactions={mockTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;