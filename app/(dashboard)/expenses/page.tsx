import React from "react";
import { MonthFilter } from "@/components/MonthFilter";
import { YearFilter } from "@/components/YearFilter";
import { apiCaller } from "@/lib/auth";
import { formatCurrency, getMonthNameFromNumber, getMonthNumber } from "@/lib/utils";
import { Expenses } from "@/types/types";
import { cookies } from "next/headers";
import { ExpenseCard } from "@/app/(dashboard)/expenses/_components/ExpenseCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ExpensesStatusFilter } from "@/app/(dashboard)/expenses/_components/ExpensesStatusFilter";

const tableHeadValues: string[] = [
  "EmployeeId",
  "Name",
  "Department",
  "Date",
  "Total Expense",
  "Payable Amount",
  "Status",
];

type SearchParams = {
  status?: string;
  month?: string;
  year?: number;
};

export const dynamic = "force-dynamic";

async function getExpenses(status?: string, month?: number, year?: number): Promise<Expenses> {
  try {
    const res = await apiCaller.get<Expenses>(`/api/payroll_app/expenses/`, {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
      params: {
        status,
        month,
        year,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error("Error getting the expenses data.");
  }
}

const Page = async ({ searchParams }: { searchParams: SearchParams }): Promise<React.ReactNode> => {
  const { month, year, status } = searchParams;
  const monthNumber = month && getMonthNumber(month);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const updatedMonth = monthNumber ? monthNumber : currentMonth + 1;
  const updatedYear = year ? year : currentYear;
  const monthName = getMonthNameFromNumber(updatedMonth);

  const expensesEmployeeData: Expenses = await getExpenses(status, updatedMonth, updatedYear);
  const pendingTotal = formatCurrency(expensesEmployeeData?.pending_total) || "N/A";
  const approvedTotal = formatCurrency(expensesEmployeeData?.approved_total) || "N/A";
  const totalExpenses =
    formatCurrency(expensesEmployeeData?.pending_total + expensesEmployeeData?.approved_total) ||
    "N/A";

  return (
    <>
      <div className={"mb-10 grid grid-cols-4 gap-4"}>
        <ExpenseCard heading={"Pending Expenses"} money={pendingTotal} />
        <ExpenseCard heading={"Approved Expenses"} money={approvedTotal} />
        <ExpenseCard isLast heading={"Total Expenses"} money={totalExpenses} />
        <div className={"col-span-1 mx-auto"}>
          <ExpensesStatusFilter />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-10 flex justify-end gap-x-4">
          <MonthFilter month={monthName} />
          <YearFilter year={updatedYear} />
        </div>
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableHeadValues.map((value, index) => (
                    <TableHead key={index}>{value}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {expensesEmployeeData.expenses.map((eachExpensesEmployeeData) => (
                  <TableRow key={eachExpensesEmployeeData?.id} className="relative">
                    <TableCell className={"text-nowrap"}>
                      {eachExpensesEmployeeData?.employee?.id.replaceAll("-", " ")}
                    </TableCell>
                    <TableCell>{eachExpensesEmployeeData?.employee?.first_name}</TableCell>
                    <TableCell>{eachExpensesEmployeeData?.employee?.department}</TableCell>
                    <TableCell className={"text-nowrap"}>
                      {eachExpensesEmployeeData?.date_incurred}
                    </TableCell>
                    <TableCell>{eachExpensesEmployeeData?.amount}</TableCell>
                    <TableCell>{eachExpensesEmployeeData?.amount}</TableCell>
                    <TableCell>{eachExpensesEmployeeData?.status}</TableCell>
                    <Link
                      href={`/expenses/${eachExpensesEmployeeData?.employee.id}`}
                      className="absolute inset-0"
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
