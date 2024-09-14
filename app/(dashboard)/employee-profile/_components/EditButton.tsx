import React from "react";
import { PencilLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EditButton = () => {
  return (
    <Button
      className={"flex gap-x-1 border bg-transparent text-sm text-black hover:bg-transparent"}>
      <p>Edit</p>
      <span>
        <PencilLineIcon height={16} width={16} />
      </span>
    </Button>
  );
};
