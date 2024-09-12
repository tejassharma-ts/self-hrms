import React from "react";
import { cn } from "@/lib/utils";
import { expense } from "@/types/types";

export const ExpenseReportSummary = ({
  eachExpensesEmployeeData,
  status,
}: {
  eachExpensesEmployeeData: expense;
  status: string;
}) => {
  const fields = [
    {
      name: "Name",
      value:
        eachExpensesEmployeeData.employee.first_name +
        " " +
        eachExpensesEmployeeData.employee.last_name,
    },
    { name: "Paid to", value: eachExpensesEmployeeData.category },
    { name: "Company", value: eachExpensesEmployeeData.employee.department },
    { name: "Accounting Date", value: eachExpensesEmployeeData.date_incurred },
  ];

  return (
    <>
      <div className={"border-b border-b-black pb-4"}>
        <h1 className={"text-2xl font-bold opacity-75"}>Expense Report summary</h1>
      </div>
      <div className={"flex justify-between"}>
        <div className={"flex w-full flex-col justify-between gap-y-4"}>
          <h2 className={"mb-4 text-xl font-bold"}>
            {eachExpensesEmployeeData.category.toUpperCase()}
          </h2>
          {fields.map((field, index) => (
            <div key={index} className={"flex"}>
              <h3 className={"w-1/2 font-semibold text-gray-400"}>{field.name}</h3>
              <p className={"w-1/2 font-semibold text-gray-500"}>: {field.value}</p>
            </div>
          ))}
          <div className={"mt-4 flex"}>
            <h3 className={"w-1/2 font-semibold"}>Expense</h3>
            <p className={"w-1/2 font-semibold"}>: {eachExpensesEmployeeData.amount}</p>
          </div>
          <div className={"flex"}>
            <h3 className={"w-1/2 font-semibold"}>Expense Date</h3>
            <p className={"w-1/2 font-semibold"}>: {eachExpensesEmployeeData.date_incurred}</p>
          </div>
        </div>
      </div>
      {status !== "pending" && (
        <p
          className={cn(
            "text-end text-2xl font-semibold",
            status === "approved" ? "text-green-400" : "text-red-400",
          )}>
          {status}
        </p>
      )}
    </>
  );
};
