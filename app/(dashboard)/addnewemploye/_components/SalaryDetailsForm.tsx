"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import IsGrossBased from "./IsGrossBased";
import IsComponentBased from "./IsComponentBased";

export default function SalaryDetailsForm() {
  const [components, setComponents] = useState({
    is_gross_based: true,
    is_component_based: false,
  });

  const handleCheckboxChange = (type: string) => {
    if (type === "is_component_based") {
      setComponents({
        is_gross_based: false,
        is_component_based: true,
      });
    } else {
      setComponents({
        is_gross_based: true,
        is_component_based: false,
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div className="mb-2 flex items-center">
          <Checkbox
            id="is_gross_based"
            className="h-4 w-4 rounded-full"
            checked={components.is_gross_based}
            onCheckedChange={() => handleCheckboxChange("is_gross_based")}
          />
          <label htmlFor="is_gross_based" className="ml-2 font-semibold">
            Gross Based
          </label>
        </div>

        <div className="mb-2 flex items-center">
          <Checkbox
            id="is_component_based"
            className="h-4 w-4 rounded-full"
            checked={components.is_component_based}
            onCheckedChange={() => handleCheckboxChange("is_component_based")}
          />
          <label htmlFor="is_component_based" className="ml-2 font-semibold">
            Component Based
          </label>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-8 shadow-md">
        {components.is_gross_based ? (
          <IsGrossBased />
        ) : components.is_component_based ? (
          <IsComponentBased />
        ) : null}
      </div>
    </div>
  );
}
