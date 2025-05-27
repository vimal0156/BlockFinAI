import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Login values:", values);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1 className="mb-2 text-center text-6xl text-black lg:mb-4">Login</h1>
          <p className="text-center">Welcome back! Please login to continue.</p>
          
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full lg:w-2/3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>

          <Button type="submit" className="w-full lg:w-2/3" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;