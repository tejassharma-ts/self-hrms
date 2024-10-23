"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiCaller } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const departmentInputSchema = z.object({
  depart_name: z
    .string()
    .min(2, {
      message: "It ought to be longer than 2 character(s)",
    })
    .toLowerCase()
    .trim(),
});

type DepartmentInputValues = z.infer<typeof departmentInputSchema>;

export default function AddDepartmentForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentInputSchema),
    defaultValues: {
      depart_name: "",
    },
  });

  const [isSaving, setIsSaving] = React.useState(false);
  // const [isRemovingDepartment, setIsRemovingDepartment] = React.useState(false);

  // dirty way of removing department probably make a different form for deleting categories ?
  // const onRemoveDepartment = async () => {};

  async function onSubmit(data: DepartmentInputValues) {
    try {
      setIsSaving(true);
      await apiCaller.post("/api/companies-app/api/department/", data);

      toast({
        description: "Department is successfully added",
      });
    } catch (err) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border">
        <CardHeader>
          <CardTitle>Employee Departments</CardTitle>
          <CardDescription>
            Manage and track all departments within the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input id="depart_name" className="w-[400px]" size={32} {...register("depart_name")} />
            {errors.depart_name?.message && (
              <span className="text-sm text-destructive">{errors.depart_name.message}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="gap-4">
          <button type="submit" className={cn(buttonVariants())} disabled={isSaving}>
            {isSaving && <Icons.loader className="mr-2" />}
            <span>Add department</span>
          </button>
          {/* <button */}
          {/*   type="button" */}
          {/*   className={cn(buttonVariants({ variant: "secondary" }))} */}
          {/*   onClick={onRemoveDepartment} */}
          {/*   disabled={isRemovingDepartment}> */}
          {/*   {isRemovingDepartment && <Icons.loader className="mr-2" />} */}
          {/*   <span>Remove department</span> */}
          {/* </button> */}
        </CardFooter>
      </Card>
    </form>
  );
}
