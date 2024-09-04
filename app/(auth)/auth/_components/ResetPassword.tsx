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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { ResetPasswordSchema } from "@/validations/auth";
import { toast } from "@/hooks/use-toast";
import { api } from "@/api/api";
import { PasswordInput } from "./PasswordInput";

interface ResetPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  uid: string;
  token: string;
}

export default function ResetPassword({ className, uid, token, ...props }: ResetPasswordProps) {
  console.log(uid, token);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof ResetPasswordSchema>) {
    try {
      setIsLoading(true);
      await api.post("/api/auth/forgot-password/", formData);
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
      <h1 className="font-medium">Reset password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-1">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="mt-2">
              {isLoading ? <Icons.loader /> : "Change password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
