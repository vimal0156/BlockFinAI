
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Search, FileText, Shield, CreditCard, User, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const faqItems = [
    {
      question: "How do I create a BlockFin account?",
      answer: "To create a BlockFin account, click on the 'Sign Up' button in the navigation bar, fill out the required information, and follow the verification process."
    },
    {
      question: "How secure is BlockFin?",
      answer: "BlockFin uses advanced security measures including multi-factor authentication, cold storage of assets, and AI-powered fraud detection to ensure your assets remain secure."
    },
    {
      question: "What cryptocurrencies does BlockFin support?",
      answer: "BlockFin supports major cryptocurrencies including Bitcoin, Ethereum, Solana, as well as numerous altcoins and stablecoins. Check our Assets page for a complete list."
    },
    {
      question: "How do I withdraw funds?",
      answer: "To withdraw funds, navigate to your Wallet, select the asset you want to withdraw, click on 'Withdraw', enter the withdrawal amount and destination address, then confirm the transaction."
    },
    {
      question: "What are the fees for using BlockFin?",
      answer: "BlockFin has a transparent fee structure. You can view all our fees on the Service Charges page. We offer competitive rates with discounts for high-volume traders."
    }
  ];

  const categories = [
    { title: "Account Management", icon: User, count: 15 },
    { title: "Security & Privacy", icon: Shield, count: 12 },
    { title: "Payments & Withdrawals", icon: CreditCard, count: 18 },
    { title: "Trading & Exchange", icon: ArrowLeftRight, count: 20 },
    { title: "Technical Issues", icon: HelpCircle, count: 10 },
    { title: "Regulations & Compliance", icon: FileText, count: 8 }
  ];

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Find answers to your questions about BlockFin services, features, and troubleshooting
        </p>
        
        <div className="mt-8 max-w-xl mx-auto flex">
          <Input 
            placeholder="Search for help..." 
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="rounded-l-none">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="faq" className="mb-12">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="categories">Help Categories</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-4">
          {faqItems.map((item, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <category.icon className="h-5 w-5 mr-2 text-primary" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.count} articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Browse Articles</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                We're here to help with any questions or issues you might have.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Describe your issue in detail..."
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <Button className="w-full md:w-auto">Submit Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-4">Need More Support?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Our Team</Link>
          </Button>
          <Button>Live Chat</Button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
