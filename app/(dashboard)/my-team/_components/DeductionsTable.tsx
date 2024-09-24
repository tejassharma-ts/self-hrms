import React from "react";
import { Deductions } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deductionsTableHead } from "@/app/(dashboard)/my-team/constants";

export const DeductionsTable = ({ deductions }: { deductions: Deductions }) => {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {deductionsTableHead.map((eachDeductions, index) => (
              <TableHead key={index}>{eachDeductions}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {deductions.deductions.map((deduction, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap">
                {Array.isArray(deduction.deduction_types)
                  ? deduction.deduction_types
                      .map((type) =>
                        typeof type === "object" && type !== null
                          ? type.name || JSON.stringify(type)
                          : type,
                      )
                      .join(", ")
                  : "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap">{deduction.amount}</TableCell>
              <TableCell className="whitespace-nowrap">{deduction.date_applied}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
