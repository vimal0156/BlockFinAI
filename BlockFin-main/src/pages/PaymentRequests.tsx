
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowDownLeft, Copy, Plus, QrCode, Share2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CryptoCurrencySelector } from "@/components/CryptoCurrencySelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const paymentRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().optional(),
  cryptocurrency: z.string().min(1, "Cryptocurrency is required"),
  expiryDate: z.string().optional(),
});

type PaymentRequest = {
  id: string;
  title: string;
  amount: string;
  cryptocurrency: string;
  description?: string;
  created: string;
  expires?: string;
  status: "pending" | "completed" | "expired";
  paymentLink: string;
};

const mockPaymentRequests: PaymentRequest[] = [
  {
    id: "1",
    title: "Website Development",
    amount: "0.25",
    cryptocurrency: "BTC",
    description: "Payment for website development services",
    created: "2024-05-10",
    expires: "2024-06-10",
    status: "pending",
    paymentLink: "https://blockfin.com/pay/btc-123456",
  },
  {
    id: "2",
    title: "Design Consultation",
    amount: "150",
    cryptocurrency: "USDT",
    description: "UI/UX design consultation fee",
    created: "2024-05-12",
    status: "completed",
    paymentLink: "https://blockfin.com/pay/usdt-789012",
  },
];

const PaymentRequests = () => {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(mockPaymentRequests);
  const [showForm, setShowForm] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentRequestSchema>>({
    resolver: zodResolver(paymentRequestSchema),
    defaultValues: {
      title: "",
      amount: "",
      description: "",
      cryptocurrency: "BTC",
      expiryDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof paymentRequestSchema>) => {
    const newRequest: PaymentRequest = {
      id: Date.now().toString(),
      title: values.title,
      amount: values.amount,
      cryptocurrency: values.cryptocurrency,
      description: values.description,
      created: new Date().toISOString().split("T")[0],
      expires: values.expiryDate || undefined,
      status: "pending",
      paymentLink: `https://blockfin.com/pay/${values.cryptocurrency.toLowerCase()}-${Math.floor(Math.random() * 1000000)}`,
    };

    setPaymentRequests([newRequest, ...paymentRequests]);
    setShowForm(false);
    form.reset();

    toast({
      title: "Payment request created",
      description: "Your payment request has been created successfully",
    });
  };

  const deletePaymentRequest = (id: string) => {
    setPaymentRequests(paymentRequests.filter(request => request.id !== id));
    toast({
      title: "Payment request deleted",
      description: "Your payment request has been deleted",
    });
  };

  const copyPaymentLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "Payment link copied to clipboard",
    });
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Payment Requests</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "New Request"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Payment Request</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Design Services" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.000001" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cryptocurrency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cryptocurrency</FormLabel>
                        <FormControl>
                          <CryptoCurrencySelector 
                            value={field.value} 
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedCrypto(value);
                            }}
                            label=""
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Add details about this request" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Payment Request
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderPaymentRequests(paymentRequests)}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {renderPaymentRequests(paymentRequests.filter(req => req.status === "pending"))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {renderPaymentRequests(paymentRequests.filter(req => req.status === "completed"))}
        </TabsContent>
        
        <TabsContent value="expired" className="space-y-4">
          {renderPaymentRequests(paymentRequests.filter(req => req.status === "expired"))}
        </TabsContent>
      </Tabs>
    </div>
  );

  function renderPaymentRequests(requests: PaymentRequest[]) {
    if (requests.length === 0) {
      return (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <ArrowDownLeft className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No payment requests</h3>
            <p className="text-muted-foreground">
              You haven't created any payment requests in this category.
            </p>
            <Button onClick={() => setShowForm(true)} className="mt-2">
              Create a new payment request
            </Button>
          </div>
        </Card>
      );
    }

    return requests.map((request) => (
      <Card key={request.id} className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{request.title}</h3>
              <p className="text-xl font-bold mt-1">
                {request.amount} {request.cryptocurrency}
              </p>
              {request.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {request.description}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                request.status === "pending" ? "bg-blue-100 text-blue-700" : 
                request.status === "completed" ? "bg-green-100 text-green-700" : 
                "bg-red-100 text-red-700"
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                Created: {new Date(request.created).toLocaleDateString()}
              </p>
              {request.expires && (
                <p className="text-xs text-muted-foreground mt-1">
                  Expires: {new Date(request.expires).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyPaymentLink(request.paymentLink)}
              className="gap-1"
            >
              <Copy className="h-3 w-3" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <QrCode className="h-3 w-3" />
              Show QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Share2 className="h-3 w-3" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deletePaymentRequest(request.id)}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 ml-auto gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    ));
  }
};

export default PaymentRequests;
