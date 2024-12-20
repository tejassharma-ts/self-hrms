"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import IsComponentBased from "./IsComponentBased";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddEmployeeStore } from "@/model/add-employee";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

type SalaryDetailsFormProps = {
  salaryStructure?: any;
  employeeID?: string;
};
export default function SalaryDetailsForm({ salaryStructure, employeeID }: SalaryDetailsFormProps) {
  const [salaryVariant, setSalaryVariant] = useState("gross-based");
  const { setEmployeeField } = useAddEmployeeStore();

  useEffect(() => {
    if (!salaryStructure) return;
    setEmployeeField("salaryStructure", salaryStructure);
  }, [salaryStructure]);

  useEffect(() => {
    if (!salaryStructure) return;
    setSalaryVariant(salaryStructure.is_gross_based ? "gross-based" : "component-based");
  }, [salaryStructure]);

  return (
    <>
      <div className="mx-auto flex max-w-5xl justify-between py-8">
        <RadioGroup
          value={salaryVariant}
          onValueChange={setSalaryVariant}
          defaultValue={salaryVariant}
          className="flex w-full justify-between">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gross-based" id="r1" />
            <Label htmlFor="r1" className="text-base">
              MployClick Default
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="component-based" id="r2" />
            <Label htmlFor="r2" className="text-base">
              Component based
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Card className="rounded-md">
        <Link
          href="/my-team?tab=staff-details"
          className={cn(buttonVariants({ variant: "ghost", className: "m-2" }))}>
          <Icons.left className="mr-2 text-muted-foreground" />
          Staff Details Overview
        </Link>

        <CardContent className="pt-6">
          <IsComponentBased
            salaryStructure={salaryStructure}
            employeeID={employeeID}
            showDefaultSettings={salaryVariant !== "gross-based"}
          />

          {/* {salaryVariant === "gross-based" ? ( */}
          {/*   <IsGrossBased salaryStructure={salaryStructure} employeeID={employeeID} /> */}
          {/* ) : ( */}
          {/* )} */}
        </CardContent>
      </Card>
    </>
  );
}
