
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Clock, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CryptoCurrencySelector } from "@/components/CryptoCurrencySelector";

const recurringPaymentSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z.string().min(1, "Amount is required"),
  frequency: z.string().min(1, "Frequency is required"),
  startDate: z.string().min(1, "Start date is required"),
  cryptocurrency: z.string().min(1, "Cryptocurrency is required"),
});

type RecurringPayment = {
  id: string;
  recipient: string;
  amount: string;
  cryptocurrency: string;
  frequency: string;
  nextPayment: string;
  status: "active" | "paused" | "completed";
};

const mockRecurringPayments: RecurringPayment[] = [
  {
    id: "1",
    recipient: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: "0.05",
    cryptocurrency: "BTC",
    frequency: "Monthly",
    nextPayment: "2024-06-15",
    status: "active",
  },
  {
    id: "2",
    recipient: "0x123d35Cc6634C0532925a3b844Bc454e4438f789",
    amount: "100",
    cryptocurrency: "USDT",
    frequency: "Weekly",
    nextPayment: "2024-05-25",
    status: "active",
  },
];

const RecurringPayments = () => {
  const [recurringPayments, setRecurringPayments] = useState<RecurringPayment[]>(mockRecurringPayments);
  const [showForm, setShowForm] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recurringPaymentSchema>>({
    resolver: zodResolver(recurringPaymentSchema),
    defaultValues: {
      recipient: "",
      amount: "",
      frequency: "monthly",
      startDate: new Date().toISOString().split("T")[0],
      cryptocurrency: "BTC",
    },
  });

  const onSubmit = (values: z.infer<typeof recurringPaymentSchema>) => {
    const newPayment: RecurringPayment = {
      id: Date.now().toString(),
      recipient: values.recipient,
      amount: values.amount,
      cryptocurrency: values.cryptocurrency,
      frequency: values.frequency === "daily" ? "Daily" : values.frequency === "weekly" ? "Weekly" : "Monthly",
      nextPayment: values.startDate,
      status: "active",
    };

    setRecurringPayments([...recurringPayments, newPayment]);
    setShowForm(false);
    form.reset();

    toast({
      title: "Recurring payment created",
      description: "Your recurring payment has been set up successfully",
    });
  };

  const deleteRecurringPayment = (id: string) => {
    setRecurringPayments(recurringPayments.filter(payment => payment.id !== id));
    toast({
      title: "Recurring payment deleted",
      description: "Your recurring payment has been deleted",
    });
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Recurring Crypto Payments</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "New Recurring Payment"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Set Up Recurring Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Schedule Recurring Payment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {recurringPayments.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Clock className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No recurring payments</h3>
              <p className="text-muted-foreground">
                You haven't set up any recurring payments yet.
              </p>
              <Button onClick={() => setShowForm(true)} className="mt-2">
                Set up your first recurring payment
              </Button>
            </div>
          </Card>
        ) : (
          recurringPayments.map((payment) => (
            <Card key={payment.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{payment.amount} {payment.cryptocurrency}</h3>
                    <p className="text-sm text-muted-foreground mt-1 font-mono truncate max-w-[250px] md:max-w-[450px]">
                      To: {payment.recipient}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      payment.status === "active" ? "bg-green-100 text-green-700" : 
                      payment.status === "paused" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRecurringPayment(payment.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{payment.frequency}</span>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="text-muted-foreground">Next payment: </span>
                    <span>{new Date(payment.nextPayment).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RecurringPayments;
