import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Expenses } from "@/app/(dashboard)/expenses/page";

export const ApprovedExpensesDialogue = ({
  eachExpensesEmployeeData,
}: {
  eachExpensesEmployeeData: Expenses;
}) => {
  return (
    <DialogContent className={"w-2/4 max-w-full px-10"}>
      <div className={"flex justify-between border-b border-b-black pb-4"}>
        <div>
          <h2 className={"text-xl font-bold"}>Company Name</h2>
          <p className={"text-sm text-gray-600"}>Address , City , State</p>
        </div>
        <div className={"flex flex-col"}>
          <h2 className={"font-bold text-gray-500"}>Pay Slip of Reimburse</h2>
          <p className={"text-end font-bold"}>August 2024</p>
        </div>
      </div>
      <div className={"flex justify-between"}>
        <div className={"flex flex-col justify-between"}>
          <h3 className={"font-semibold"}>Employee Pay summary (Reimburse)</h3>
          <h2 className={"text-xl font-bold"}>{eachExpensesEmployeeData.category}</h2>
          <div>
            <div className={"flex items-center justify-between"}>
              <h3 className={"text-gray-500"}>Name :</h3>
              <p>
                {eachExpensesEmployeeData.employee.first_name}{" "}
                {eachExpensesEmployeeData.employee.last_name}
              </p>
            </div>
            <div className={"flex items-center justify-between gap-x-2"}>
              <h3 className={"text-gray-500"}>Employee ID :</h3>
              <p>{eachExpensesEmployeeData.employee.id}</p>
            </div>
            <div className={"flex items-center justify-between"}>
              <h3 className={"text-gray-500"}>Department :</h3>
              <p>{eachExpensesEmployeeData.employee.department}</p>
            </div>
            <div className={"flex items-center justify-between"}>
              <h3 className={"text-gray-500"}>Expense :</h3>
              <p>{eachExpensesEmployeeData.description}</p>
            </div>
            <div className={"flex items-center justify-between"}>
              <h3 className={"text-gray-500"}>Expense Date :</h3>
              <p>{eachExpensesEmployeeData.date_incurred}</p>
            </div>
          </div>
        </div>
        <Card className={"w-2/6"}>
          <CardContent className="w-full overflow-hidden rounded-xl border border-black p-0">
            <div className="flex flex-col rounded-t-xl bg-gray-200 p-2">
              <h2 className={"text-lg font-bold"}>{eachExpensesEmployeeData.amount}</h2>
              <p className={"text-sm font-semibold text-gray-600"}>Employee Net Pay</p>
            </div>
            <div className="p-2">
              <p className={"text-xs"}>: {eachExpensesEmployeeData.employee.id}</p>
              <p className={"text-xs"}>: {eachExpensesEmployeeData.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={"flex items-center justify-between gap-x-4"}>
        <Input placeholder="Reason of Rejection" />
        <div className={"flex gap-x-2"}>
          <Button className={"bg-green-500 text-white hover:bg-green-600"}>Approved</Button>
          <Button
            className={
              "border border-black bg-transparent text-black hover:bg-black hover:text-white"
            }>
            Rejected
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
