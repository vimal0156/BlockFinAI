import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Invalid card number").max(16, "Invalid card number"),
  expiryMonth: z.string().min(1, "Required"),
  expiryYear: z.string().min(1, "Required"),
  cvv: z.string().min(3, "Invalid CVV").max(4, "Invalid CVV"),
  name: z.string().min(2, "Name is required"),
});

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    setIsLoading(true);
    try {
      console.log("Payment details:", values);
      toast({
        title: "Success",
        description: "Payment method added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process payment",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCryptoPayment = () => {
    navigate("/crypto-payment");
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Payment</h1>
      <Tabs defaultValue="card">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="card" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Card Payment
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Crypto Payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="card">
          <Card>
            <CardHeader>
              <CardTitle>Add Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name on card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Month</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = (i + 1).toString().padStart(2, "0");
                                return (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expiryYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = (new Date().getFullYear() + i).toString();
                                return (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              maxLength={4}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Add Payment Method"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>Crypto Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pay using your preferred cryptocurrency. We support multiple chains and tokens.
              </p>
              <Button onClick={handleCryptoPayment} className="w-full">
                Continue with Crypto Payment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payment;
