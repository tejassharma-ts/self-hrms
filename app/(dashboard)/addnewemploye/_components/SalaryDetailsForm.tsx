"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import IsGrossBased from "./IsGrossBased";
import IsComponentBased from "../IsComponentBased";

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
                <div className="flex items-center mb-2">
                    <Checkbox
                        id="is_gross_based"
                        className="rounded-full h-4 w-4"
                        checked={components.is_gross_based}
                        onCheckedChange={() => handleCheckboxChange("is_gross_based")}
                    />
                    <label htmlFor="is_gross_based" className="ml-2 font-semibold">Gross Based</label>
                </div>

                <div className="flex items-center mb-2">
                    <Checkbox
                        id="is_component_based"
                        className="rounded-full h-4 w-4"
                        checked={components.is_component_based}
                        onCheckedChange={() => handleCheckboxChange("is_component_based")}
                    />
                    <label htmlFor="is_component_based" className="ml-2 font-semibold">Component Based</label>
                </div>
            </div>

            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md mt-10">
                {components.is_gross_based ? (
                    <IsGrossBased />
                ) : components.is_component_based ? (
                    <IsComponentBased />
                ) : null}

            </div>
        </div>
    );
}