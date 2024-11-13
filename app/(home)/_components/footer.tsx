"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Container from "./_ui/container";
import Para from "./_ui/para";
import Logo from "./logo";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UserRound as Person } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="pb-8 mt-20">
      {/* <div className="mx-auto my-20 h-[0.8px] w-full max-w-lg rounded-full bg-[#25282c]"></div> */}
      <Container>
        <div className="flex gap-20">
          <div>
            <Logo />
            <Para className="mt-2 leading-normal">
              Human Resource <br /> Management software
            </Para>
          </div>

          <div className="text-white">
            <h2 className="mb-6 font-semibold">Contact info</h2>
            <div className="flex flex-col gap-y-3 text-sm text-white">
              <div className="mb-2 flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>info@moloyclick.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>(219) 555-0114</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="block">
                  2715 Ash Dr. San Jose,
                  <br />
                  South Dakota 83475
                </span>
              </div>
            </div>
          </div>

          <div className="ml-auto max-w-xl flex-1">
            <h2 className="mb-6 font-semibold text-white">Get in touch</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
      <div className="mx-auto mb-8 mt-16 h-[0.8px] w-full max-w-lg rounded-full bg-[#25282c]/35"></div>
      <Para className="text-center text-sm">©2024 Company Name Ltd, All rights reserved</Para>
    </footer>
  );
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Please provide your name" }).max(50),
  phone: z.string(),
  email: z.string().email(),
  query: z
    .string()
    .min(2, {
      message: "Can't leave this empty",
    })
    .max(200, { message: "Query should be less than 200 character(s)" }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex w-full gap-x-8">
          <div className="mb-4 flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      className="h-[48px] rounded-lg border-none bg-[#111113] text-base text-white placeholder:text-white/80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Input
                    type="email"
                    className="h-[48px] rounded-lg border-none bg-[#111113] text-base text-white placeholder:text-white/80"
                    placeholder="Your Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="min-h-[100px] rounded-lg border-none bg-[#111113] text-base text-white placeholder:text-white/80"
                  placeholder="Your Message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="relative mt-8 h-[40px] self-start border-[2.5px] border-[#24272b] bg-[#09090B] px-10 text-sm before:absolute before:-bottom-[2px] before:h-[1px] before:w-[50%] before:rounded before:bg-gradient-to-r before:from-[#24272b] before:via-[#22D3EE] before:to-[#24272b] before:transition-all hover:bg-[#24272b] hover:before:w-[80%]">
          Submit
        </Button>
      </form>
    </Form>
  );
}
