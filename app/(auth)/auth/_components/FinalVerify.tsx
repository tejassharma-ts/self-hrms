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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { publicApiCaller } from "@/lib/auth";
import useAuthStore from "@/model/auth";

interface UserSigninFromProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FormSchema = z.object({
  email: z.string(),
  otp: z.string().min(6, {
    message: "Please enter valid a OTP",
  }),
});

export default function FinalVerification({ className, ...props }: UserSigninFromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: searchParams.get("email")! || searchParams.get("company_email")!,
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      await login(data);

      router.push("/company-register");
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
              name="otp"
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
