"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useAddEmployeeStore } from "@/model/add-employee";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Steps() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const { form } = useAddEmployeeStore();

  function navigateTo(formName: string) {
    const params = new URLSearchParams(searchParams);
    params.set("active_form", formName);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between py-6 font-semibold">
      <Button
        variant="ghost"
        className="relative flex space-x-2"
        onClick={() => navigateTo("personal-detail")}>
        <span className="flex size-6 items-center justify-center rounded-full bg-black text-white">
          1
        </span>
        <h1>Personal Details</h1>
      </Button>
      <div className="flex w-1/2 items-center justify-between">
        <Icons.right size={18} />
        <Button
          //  TODO: not best
          disabled={!form.personal?.first_name}
          variant="ghost"
          className="relative flex space-x-2"
          onClick={() => navigateTo("bank-details")}>
          <span className="flex size-6 items-center justify-center rounded-full bg-black text-white">
            2
          </span>
          <h1>Bank / KYC</h1>
        </Button>
        <Icons.right size={18} />
      </div>
      <Button
        disabled={!form.personal?.bank_name}
        variant="ghost"
        className="relative flex space-x-2"
        onClick={() => navigateTo("salary-structure")}>
        <span className="flex size-6 items-center justify-center rounded-full bg-black text-white">
          3
        </span>
        <h1>Salary Details</h1>
      </Button>
    </div>
  );
}
