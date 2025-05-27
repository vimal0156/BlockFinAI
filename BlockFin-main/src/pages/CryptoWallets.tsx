
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Wallet, 
  Plus, 
  Copy, 
  QrCode, 
  Send, 
  Download, 
  Trash, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  KeyRound
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface WalletInfo {
  id: string;
  name: string;
  type: string;
  address: string;
  balance: string;
  balanceUsd: string;
  isActive: boolean;
}

export default function CryptoWallets() {
  const [wallets, setWallets] = useState<WalletInfo[]>([
    {
      id: "1",
      name: "Main Wallet",
      type: "BTC",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      balance: "0.23451",
      balanceUsd: "14,520.65",
      isActive: true
    },
    {
      id: "2",
      name: "Savings",
      type: "ETH",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      balance: "5.4321",
      balanceUsd: "20,675.32",
      isActive: true
    },
    {
      id: "3",
      name: "Trading",
      type: "USDT",
      address: "TBpMuv8ZqZ4KPLJh1L1E4BVHPzq9oxvY2t",
      balance: "15,000.00",
      balanceUsd: "15,000.00",
      isActive: false
    }
  ]);
  
  const [newWalletName, setNewWalletName] = useState("");
  const [newWalletType, setNewWalletType] = useState("BTC");
  const [activeWallet, setActiveWallet] = useState<WalletInfo | null>(null);
  const { toast } = useToast();

  const handleCreateWallet = () => {
    if (!newWalletName) {
      toast({
        title: "Error",
        description: "Please enter a wallet name",
        variant: "destructive",
      });
      return;
    }
    
    // Generate mock wallet address based on type
    let address = "";
    if (newWalletType === "BTC") {
      address = "bc1q" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    } else if (newWalletType === "ETH") {
      address = "0x" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    } else {
      address = "T" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    const newWallet: WalletInfo = {
      id: Date.now().toString(),
      name: newWalletName,
      type: newWalletType,
      address: address,
      balance: "0.00",
      balanceUsd: "0.00",
      isActive: true
    };
    
    setWallets([...wallets, newWallet]);
    setNewWalletName("");
    
    toast({
      title: "Wallet Created",
      description: `${newWalletName} wallet created successfully`,
    });
  };

  const handleDeleteWallet = (id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
    
    toast({
      title: "Wallet Deleted",
      description: "Wallet has been removed",
    });
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Crypto Wallets</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="all">All Wallets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {wallets.filter(wallet => wallet.isActive).map((wallet) => (
                    <div key={wallet.id} className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 p-4 border rounded-lg">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              wallet.type === "BTC" ? "bg-amber-100 text-amber-700" : 
                              wallet.type === "ETH" ? "bg-purple-100 text-purple-700" : 
                              "bg-green-100 text-green-700"
                            }`}>
                              <Wallet className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">{wallet.name}</h3>
                              <p className="text-xs text-muted-foreground">{wallet.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{wallet.balance} {wallet.type}</p>
                            <p className="text-xs text-muted-foreground">${wallet.balanceUsd}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3">
                          <div className="text-xs text-muted-foreground truncate flex-grow">
                            {wallet.address.substring(0, 12)}...{wallet.address.substring(wallet.address.length - 8)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleCopyAddress(wallet.address)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <QrCode className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Wallet QR Code</DialogTitle>
                                  <DialogDescription>
                                    Scan this QR code to send funds to this wallet
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="p-4 bg-white rounded-lg mx-auto">
                                  <QrCode className="h-48 w-48 text-black" />
                                </div>
                                <p className="text-xs text-center break-all px-8">{wallet.address}</p>
                                <DialogFooter>
                                  <Button variant="outline" className="w-full" onClick={() => handleCopyAddress(wallet.address)}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy Address
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => setActiveWallet(wallet)}>
                                  <Send className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Send {wallet.type}</DialogTitle>
                                  <DialogDescription>
                                    Enter the details to send from {wallet.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="recipient">Recipient Address</Label>
                                    <Input id="recipient" placeholder={`Enter ${wallet.type} address`} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <div className="relative">
                                      <Input id="amount" placeholder="0.00" />
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <span className="text-sm text-muted-foreground">{wallet.type}</span>
                                      </div>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-muted-foreground">Available: {wallet.balance} {wallet.type}</span>
                                      <button className="text-primary">Max</button>
                                    </div>
                                  </div>
                                  <div className="p-3 bg-muted rounded-lg text-sm">
                                    <div className="flex justify-between">
                                      <span>Network Fee</span>
                                      <span>0.0005 {wallet.type}</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span>Total Amount</span>
                                      <span>0.0000 {wallet.type}</span>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" className="w-full">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send {wallet.type}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {wallets.filter(wallet => wallet.isActive).length === 0 && (
                    <div className="text-center p-8">
                      <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                      <h3 className="text-lg font-medium mb-2">No Active Wallets</h3>
                      <p className="text-muted-foreground mb-4">
                        Create a new wallet to get started
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all" className="space-y-4">
                  {wallets.map((wallet) => (
                    <div key={wallet.id} className={`flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 p-4 border rounded-lg ${!wallet.isActive ? 'opacity-60' : ''}`}>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              wallet.type === "BTC" ? "bg-amber-100 text-amber-700" : 
                              wallet.type === "ETH" ? "bg-purple-100 text-purple-700" : 
                              "bg-green-100 text-green-700"
                            }`}>
                              <Wallet className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium">{wallet.name}</h3>
                              <div className="flex items-center">
                                <p className="text-xs text-muted-foreground mr-2">{wallet.type}</p>
                                {!wallet.isActive && (
                                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Inactive</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{wallet.balance} {wallet.type}</p>
                            <p className="text-xs text-muted-foreground">${wallet.balanceUsd}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3">
                          <div className="text-xs text-muted-foreground truncate flex-grow">
                            {wallet.address.substring(0, 12)}...{wallet.address.substring(wallet.address.length - 8)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteWallet(wallet.id)}>
                              <Trash className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleCopyAddress(wallet.address)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <QrCode className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet-name">Wallet Name</Label>
                <Input 
                  id="wallet-name" 
                  placeholder="Enter wallet name" 
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wallet-type">Cryptocurrency</Label>
                <select 
                  id="wallet-type" 
                  className="w-full p-2 border rounded-md"
                  value={newWalletType}
                  onChange={(e) => setNewWalletType(e.target.value)}
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
              </div>
              
              <div className="pt-2">
                <Button className="w-full" onClick={handleCreateWallet}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wallet Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" className="justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="justify-start">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Backup
                </Button>
                <Button variant="outline" className="justify-start">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Explorer
                </Button>
              </div>
              
              <div className="p-3 border rounded-lg bg-muted/20 mt-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-medium mb-1">Wallet Security</p>
                    <p className="text-muted-foreground">Always backup your wallet and never share your private keys with anyone.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Received BTC</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <p className="font-medium text-green-600">+0.05 BTC</p>
                </div>
                <div className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Sent ETH</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <p className="font-medium text-red-600">-1.2 ETH</p>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Received USDT</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <p className="font-medium text-green-600">+500 USDT</p>
                </div>
                
                <Button variant="outline" className="w-full text-sm">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
