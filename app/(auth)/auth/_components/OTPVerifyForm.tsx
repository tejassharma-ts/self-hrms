"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/model/auth";
import { publicApiCaller } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import Countdown from "react-countdown";
import { SelectRangeContext } from "react-day-picker";

const FormSchema = z.object({
  email: z.string(),
  otp: z.string().min(6, {
    message: "Please enter valid a OTP",
  }),
});

// DDoS yes
const maxOtpResendAttempts = 2;
export function InputOTPForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // email must exists
      email: searchParams.get("email")! || searchParams.get("company_email")!,
      otp: "",
    },
  });
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [date, setDate] = useState(Date.now() + 120000);
  const router = useRouter();
  const { login } = useAuthStore();
  const [otpResendCount, setOtpResendCount] = useState(0);

  useEffect(() => {
    if (searchParams.has("final-verification")) {
      form.resetField("otp");
      setDate(Date.now() + 120000);
    }
  }, [searchParams]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const email = searchParams.get("email");
      if (!email && !searchParams.has("final-verification")) {
        await publicApiCaller.post("/api/auth/verify/", {
          email: data.email,
          code: data.otp,
        });

        // generate otp
        await publicApiCaller.post("/api/auth/login/generate-otp/", {
          email: data.email,
        });

        const params = new URLSearchParams(searchParams);
        params.set("final-verification", "true");
        router.replace(`${pathname}?${params.toString()}`);
      } else {
        await login(data);
        // check if the company profile already exists
        router.push("/company-register");
      }
    } catch (err) {
      toast({
        title: "Authentication",
        description: "Something went wrong please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function resendOTP() {
    if (otpResendCount >= maxOtpResendAttempts) {
      return toast({
        title: "Resend Limit Reached",
        description: `You can only resend the OTP ${maxOtpResendAttempts} times.`,
        variant: "destructive",
      });
    }
    try {
      let email = form.getValues("email");
      await publicApiCaller.post("/api/auth/login/generate-otp/", {
        email,
      });
      toast({
        title: "Authentication",
        description: `OTP has been send to ${email}`,
      });

      setIsTimerComplete(false);
      setDate(Date.now() + 120000);
      setOtpResendCount(otpResendCount + 1);
    } catch (err) {
      console.log(err);
      toast({
        title: "Authentication",
        description: "Something went wrong please try again later.",
        variant: "destructive",
      });
    }
  }

  function rendererTimer({
    minutes,
    seconds,
    completed,
  }: {
    // TODO: give  proper typings
    minutes: any;
    seconds: any;
    completed: any;
  }) {
    if (completed) setIsTimerComplete(true);
    return <span>{`${minutes}:${seconds.toString().padStart(2, "0")}`}</span>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              {searchParams.has("final-verification") ? (
                <FormLabel>Login OTP</FormLabel>
              ) : (
                <FormLabel>Write the verification OTP</FormLabel>
              )}
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="text-center">
                Please check your email <br />
                <span className="font-medium">
                  {searchParams.get("email") || searchParams.get("company_email")}
                </span>
                <br />
                <Link href="/register" className="mt-2 block underline underline-offset-4">
                  Email not correct?
                </Link>
                <span className="mt-4 block">
                  {!isTimerComplete && <Countdown date={date} renderer={rendererTimer} />}
                  {isTimerComplete && (
                    <Button variant="ghost" size="sm" onClick={resendOTP} type="button">
                      Resend OTP
                    </Button>
                  )}
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="mt-2">
          {isLoading ? <Icons.loader /> : "Verify"}
        </Button>
      </form>
    </Form>
  );
}
