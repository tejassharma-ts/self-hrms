"use client";

import React from "react";
import { Icons } from "@/components/Icons";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiCaller } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  company_website_url: z.string().url("Invalid URL"),
  company_logo: z
    .any()
    .refine((file) => file instanceof File, "Please upload a file")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  industry: z.string().min(1, "Industry is required"),
});

export default function CompanyProfile() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "Sun Pharma",
      address: "Lucknow Gol Road",
      company_website_url:
        "http://127.0.0.1:8000/admin/user/useraccount/53db3179-2c0e-40b1-8856-db872e03b2d1/change/",
      company_logo: undefined,
      industry: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const typedKey = key as keyof typeof values;

        if (typedKey === "company_logo" && values[typedKey]) {
          formData.append(typedKey, values[typedKey], (values[typedKey] as File).name);
        } else {
          formData.append(typedKey, values[typedKey] as string);
        }
      });

      await apiCaller.post("/api/companies-app/company/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Authentication",
        description: "Logged in successfully",
      });
      router.push("/dashboard");
    } catch (error) {
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
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Registration</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="company_logo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <Input
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        id="file"
                        type="file"
                        {...field}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            onChange(file);
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>Upload your company logo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {previewUrl ? (
                <div className="mt-2 flex items-center justify-center rounded-md border border-gray-300 p-2">
                  <Avatar>
                    <AvatarImage src={previewUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="mt-2 flex h-40 items-center justify-center rounded-md border border-gray-300 p-2 text-gray-500">
                  <Image size={24} className="mr-2" />
                  <span>No image selected</span>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full">
              {isLoading ? <Icons.loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
