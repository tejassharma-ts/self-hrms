"use client";

import { PencilLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const EditButton = ({ employeeID }: { employeeID: string }) => {
  return (
    <Button
      className={
        "relative flex gap-x-1 border bg-transparent text-sm text-black hover:bg-transparent"
      }>
      <p>Edit</p>
      <span>
        <PencilLineIcon height={16} width={16} />
      </span>
      <Link href={`/add-new-employee?employee_id=${employeeID}`} className="absolute inset-0" />
    </Button>
  );
};
