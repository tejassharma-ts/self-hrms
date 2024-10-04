import React from "react";
import { MonthFilter } from "@/components/MonthFilter";
import { YearFilter } from "@/components/YearFilter";
import { apiCaller } from "@/lib/auth";
import { getMonthNumber } from "@/lib/utils";
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

export const dynamic = "force-dynamic"

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

  const updatedMonth = month ? getMonthNumber(month) : undefined;
  const expensesEmployeeData: Expenses = await getExpenses(status, updatedMonth, year);

  return (
    <>
      <div className={"mb-10 grid grid-cols-4 gap-4"}>
        <ExpenseCard
          heading={"Pending Expenses"}
          money={`${expensesEmployeeData.pending_total + expensesEmployeeData.approved_total}`}
        />
        <ExpenseCard
          heading={"Approved Expenses"}
          money={`${expensesEmployeeData.pending_total}`}
        />
        <ExpenseCard
          isLast
          heading={"Total Expenses"}
          money={`${expensesEmployeeData.approved_total + expensesEmployeeData.pending_total}`}
        />
        <div className={"col-span-1 mx-auto"}>
          <ExpensesStatusFilter />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-10 flex justify-end gap-x-4">
          <MonthFilter />
          <YearFilter />
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
                  <TableRow key={eachExpensesEmployeeData.id}>
                    <TableCell className={"text-nowrap"}>
                      <Link href={`/expenses/${eachExpensesEmployeeData.employee.id}`}>
                        {eachExpensesEmployeeData.employee.id.replaceAll("-", " ")}
                      </Link>
                    </TableCell>
                    <TableCell>{eachExpensesEmployeeData.employee.first_name}</TableCell>
                    <TableCell>{eachExpensesEmployeeData.employee.department}</TableCell>
                    <TableCell className={"text-nowrap"}>
                      {eachExpensesEmployeeData.date_incurred}
                    </TableCell>
                    <TableCell>{eachExpensesEmployeeData.amount}</TableCell>
                    <TableCell>{eachExpensesEmployeeData.amount}</TableCell>
                    <TableCell>{eachExpensesEmployeeData.status}</TableCell>
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
