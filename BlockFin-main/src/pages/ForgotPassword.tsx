import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Reset password for:", values);
      toast({
        title: "Success",
        description: "Password reset email sent successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1 className="mb-2 text-center text-6xl text-black lg:mb-4">
            Forgot Password
          </h1>
          <p className="text-center">Enter your email to reset your password</p>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full lg:w-2/3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full lg:w-2/3" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <Link to="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;