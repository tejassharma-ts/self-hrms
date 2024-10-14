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
import { SignupFormSchema } from "@/validations/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { publicApiCaller } from "@/lib/auth";

interface UserSignupFromProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function UserSignupForm({ className, ...props }: UserSignupFromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "varsha7022001@gmail.com",
    },
  });

  async function onSubmit(formData: z.infer<typeof SignupFormSchema>) {
    try {
      setIsLoading(true);
      await publicApiCaller.post("/api/auth/register/", formData);

      // OTP is successfully sent
      const params = new URLSearchParams(searchParams);
      params.set("company_email", formData.email);
      replace(`${pathname}?${params.toString()}`);
    } catch (err: any) {
      if (err && err.response) {
        return toast({
          title: "Authentication",
          description: err.response.data?.error,
          variant: "destructive",
        });
      }
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
              {isLoading ? <Icons.loader /> : "Send OTP"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
