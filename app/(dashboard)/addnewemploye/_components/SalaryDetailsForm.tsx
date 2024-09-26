"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import IsGrossBased from "./IsGrossBased";
import IsComponentBased from "./IsComponentBased";

export default function SalaryDetailsForm({ salaryStructure }: { salaryStructure: any }) {
  const [components, setComponents] = useState({
    is_gross_based: true,
    is_component_based: false,
  });

  useEffect(() => {
    if (salaryStructure) {
      setComponents({
        is_gross_based: salaryStructure.is_gross_based,
        is_component_based: salaryStructure.is_component_based,
      });
    }
  }, []);

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
        {!salaryStructure && (
          <>
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
          </>
        )}
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-8 shadow-md">
        {components.is_gross_based ? (
          <IsGrossBased salaryStructure={salaryStructure} />
        ) : components.is_component_based ? (
          <IsComponentBased salaryStructure={salaryStructure} />
        ) : null}
      </div>
    </div>
  );
}
