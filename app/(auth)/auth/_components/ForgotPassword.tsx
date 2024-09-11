"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { SigninFormSchema } from "@/validations/auth";
import { toast } from "@/hooks/use-toast";
import { apiCaller } from "@/lib/auth";

interface ForgotPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  email: string;
}

export default function ForgotPassword({ className, email, ...props }: ForgotPasswordProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email,
    },
  });

  async function onSubmit(formData: z.infer<typeof SigninFormSchema>) {
    try {
      setIsLoading(true);
      await apiCaller.post("/api/auth/forgot-password/", formData);
      toast({
        description: "Reset link has been sent to your email",
      });
    } catch (err: any) {
      toast({
        title: "Authentication",
        description: "Something went wrong please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <h1 className="font-medium">Forgot password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="mt-2">
              {isLoading ? <Icons.loader /> : "Send reset link"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
