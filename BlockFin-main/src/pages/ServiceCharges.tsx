
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeftRight, Coins, CreditCard, ArrowUpRight, DollarSign, Percent } from "lucide-react";

const ServiceCharges = () => {
  const tradingFees = [
    { tier: "Basic", volume: "$0 - $50,000", maker: "0.20%", taker: "0.25%" },
    { tier: "Silver", volume: "$50,000 - $250,000", maker: "0.15%", taker: "0.20%" },
    { tier: "Gold", volume: "$250,000 - $1,000,000", maker: "0.10%", taker: "0.15%" },
    { tier: "Platinum", volume: "$1,000,000+", maker: "0.05%", taker: "0.10%" },
  ];

  const withdrawalFees = [
    { currency: "Bitcoin (BTC)", network: "Bitcoin", fee: "0.0005 BTC", flat: "$15" },
    { currency: "Ethereum (ETH)", network: "ERC-20", fee: "0.005 ETH", flat: "$10" },
    { currency: "Solana (SOL)", network: "Solana", fee: "0.01 SOL", flat: "$1" },
    { currency: "USD Coin (USDC)", network: "ERC-20", fee: "10 USDC", flat: "$10" },
    { currency: "USD Coin (USDC)", network: "Solana", fee: "1 USDC", flat: "$1" },
  ];

  const depositFees = [
    { method: "Bank Transfer (ACH)", fee: "Free", time: "3-5 business days" },
    { method: "Wire Transfer", fee: "$20", time: "1-2 business days" },
    { method: "Credit/Debit Card", fee: "3.5%", time: "Instant" },
    { method: "Cryptocurrency Deposit", fee: "Network fee varies", time: "Varies by blockchain" },
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Service Charges</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Transparent fee structure for all BlockFin services and transactions
        </p>
      </div>
      
      <Tabs defaultValue="trading" className="mb-16">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="trading">
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Trading Fees
          </TabsTrigger>
          <TabsTrigger value="withdrawal">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Withdrawal Fees
          </TabsTrigger>
          <TabsTrigger value="deposit">
            <CreditCard className="h-4 w-4 mr-2" />
            Deposit Methods
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trading">
          <Card>
            <CardHeader>
              <CardTitle>Trading Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left border-b p-4 bg-muted/50">Fee Tier</th>
                      <th className="text-left border-b p-4 bg-muted/50">30-Day Volume</th>
                      <th className="text-left border-b p-4 bg-muted/50">Maker Fee</th>
                      <th className="text-left border-b p-4 bg-muted/50">Taker Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradingFees.map((tier, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="p-4 border-b">
                          <div className="font-medium">{tier.tier}</div>
                        </td>
                        <td className="p-4 border-b">{tier.volume}</td>
                        <td className="p-4 border-b">{tier.maker}</td>
                        <td className="p-4 border-b">{tier.taker}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Understanding Maker & Taker Fees</h3>
                  <p className="text-muted-foreground">
                    <strong>Maker fees</strong> apply when you place an order that isn't immediately matched with an existing order on the order book.
                  </p>
                  <p className="text-muted-foreground mt-1">
                    <strong>Taker fees</strong> apply when you place an order that is immediately matched with an existing order on the order book.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Volume Discounts</h3>
                  <p className="text-muted-foreground">
                    Your fee tier is calculated based on your total trading volume over the past 30 days across all trading pairs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Holding BFT Tokens</h3>
                  <p className="text-muted-foreground mb-2">
                    You can receive additional discounts by holding our native BFT tokens in your account:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Hold 1,000 BFT: 10% off trading fees</li>
                    <li>Hold 5,000 BFT: 15% off trading fees</li>
                    <li>Hold 10,000 BFT: 20% off trading fees</li>
                    <li>Hold 50,000 BFT: 25% off trading fees</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="withdrawal">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left border-b p-4 bg-muted/50">Currency</th>
                      <th className="text-left border-b p-4 bg-muted/50">Network</th>
                      <th className="text-left border-b p-4 bg-muted/50">Fee</th>
                      <th className="text-left border-b p-4 bg-muted/50">Approximate USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalFees.map((fee, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="p-4 border-b">{fee.currency}</td>
                        <td className="p-4 border-b">{fee.network}</td>
                        <td className="p-4 border-b">{fee.fee}</td>
                        <td className="p-4 border-b">{fee.flat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Network Fees</h3>
                  <p className="text-muted-foreground">
                    Withdrawal fees are primarily determined by the network fees (gas fees) required to process transactions on each blockchain. These fees may vary based on network congestion.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Minimum Withdrawal Amounts</h3>
                  <p className="text-muted-foreground">
                    To ensure that withdrawal fees don't outweigh the value being transferred, we implement minimum withdrawal amounts for each cryptocurrency.
                  </p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="mr-3">
                      <Percent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Fee Reduction Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Premium and VIP users enjoy reduced withdrawal fees. Contact our support team for details on qualifying for these programs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deposit">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Methods & Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left border-b p-4 bg-muted/50">Method</th>
                      <th className="text-left border-b p-4 bg-muted/50">Fee</th>
                      <th className="text-left border-b p-4 bg-muted/50">Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositFees.map((method, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="p-4 border-b">{method.method}</td>
                        <td className="p-4 border-b">{method.fee}</td>
                        <td className="p-4 border-b">{method.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Deposit Limits</h3>
                  <p className="text-muted-foreground">
                    Different deposit methods have different minimum and maximum limits:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
                    <li>ACH Transfers: $10 minimum, $25,000 maximum per day</li>
                    <li>Wire Transfers: $100 minimum, no maximum</li>
                    <li>Credit/Debit Card: $20 minimum, $10,000 maximum per day</li>
                    <li>Cryptocurrency: No minimum, no maximum</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Verification Requirements</h3>
                  <p className="text-muted-foreground">
                    Higher deposit limits may require additional identity verification. Visit our <Link to="/security" className="text-primary hover:underline">Security</Link> page for more information on verification levels.
                  </p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="mr-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">First Deposit Bonus</h4>
                      <p className="text-sm text-muted-foreground">
                        New users receive a fee waiver on their first deposit, regardless of the method used. Terms and conditions apply.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3 w-12 h-12 flex items-center justify-center">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center">Staking Rewards</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Earn up to 12% APY by staking your crypto assets. Staking is free with no hidden fees.
            </p>
            <Button variant="outline" asChild>
              <Link to="/assets">View Staking Options</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3 w-12 h-12 flex items-center justify-center">
              <ArrowLeftRight className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center">Swap Fees</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Instantly swap between cryptocurrencies with a competitive 0.5% fee. No additional charges.
            </p>
            <Button variant="outline" asChild>
              <Link to="/exchange">Try Swapping</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3 w-12 h-12 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center">Payment Processing</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Accept crypto payments for your business with a 1% processing fee, significantly lower than traditional payment processors.
            </p>
            <Button variant="outline" asChild>
              <Link to="/payment">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How often do fees change?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We review our fee structure quarterly. Any changes will be announced at least 14 days in advance through email and platform notifications.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Are there any hidden fees?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No, BlockFin is committed to complete transparency. All applicable fees are disclosed upfront before you confirm any transaction.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How are trading fees calculated?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trading fees are calculated as a percentage of the total transaction value. For example, a 0.2% fee on a $1,000 trade would be $2.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I pay fees in BFT tokens?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can choose to pay trading fees in BFT tokens for an additional 25% discount. Enable this option in your account settings.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Need More Information?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Our support team is available 24/7 to answer any questions about our fee structure or to assist with any transaction issues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/help-center">Visit Help Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCharges;
