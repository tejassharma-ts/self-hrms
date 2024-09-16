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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { publicApiCaller } from "@/lib/auth";

interface UserSigninFromProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function UserSigninForm({ className, ...props }: UserSigninFromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const form = useForm({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "tejassharma2021@outlook.com",
    },
  });

  async function onSubmit(formData: z.infer<typeof SigninFormSchema>) {
    try {
      setIsLoading(true);
      await publicApiCaller.post("/api/auth/login/generate-otp/", formData);

      // OTP is successfully sent
      const params = new URLSearchParams(searchParams);
      params.set("email", formData.email);
      replace(`${pathname}?${params.toString()}`);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-1">
                  <FormLabel>Login OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="mt-2">
              {isLoading ? <Icons.loader /> : "Verify"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
