import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Payroll } from "@/types/types";
import { payrollTableHead } from "@/app/(dashboard)/payroll/constant";
import { YearFilter } from "@/components/YearFilter";
import { formatCurrency } from "@/lib/utils";

export const PayrollTable = ({ payrollData }: { payrollData: Payroll[] }): React.ReactNode => {
  const currentYear: number = new Date().getFullYear();

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-x-4">
        <h2 className="text-lg font-semibold">Payroll History</h2>
        <YearFilter year={currentYear} />
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {payrollTableHead.map((value, index) => (
                <TableHead key={index}>{value}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData?.map((eachPayroll: Payroll) => {
              return (
                <TableRow key={eachPayroll.pay_date}>
                  <TableCell>
                    {new Date(eachPayroll.pay_date).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>
                    {formatCurrency(eachPayroll?.bonus) || "N/A"}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>
                    {formatCurrency(eachPayroll?.total_deductions) || "N/A"}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>
                    {formatCurrency(parseInt(eachPayroll?.in_hand_salary)) || "N/A"}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>
                    {formatCurrency(parseInt(eachPayroll?.in_hand_salary)) || "N/A"}
                  </TableCell>
                  <TableCell className={"text-nowrap"}>
                    {formatCurrency(parseInt(eachPayroll?.arrears_amount)) || "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};
