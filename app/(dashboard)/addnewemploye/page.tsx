"use client";

import { useState } from "react";
import { CheckCircleIcon, ChevronRightIcon } from "lucide-react";
import AddNewEmployeeForm from "./_components/AddNewEmployeeForm";
import SalaryDetailsForm from "./_components/SalaryDetailsForm";
import AddBankDetails from "./_components/AddBankdetails";
import useEmployeeStore from "@/model/employee";

interface AddBankDetailsProps {
  employee_id: string | null;
}

export default function StepperForms() {
  const [forms, setForms] = useState({
    employeeForm: false,
    bankForm: false,
    salaryForm: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const { employee_id } = useEmployeeStore();

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="bg-[#F8F9FA] p-4">
      <h1 className="mb-10 px-8 text-3xl font-bold">Add New Employee</h1>
      <div className="flex w-full items-center justify-between rounded-md px-8 py-4">
        <div
          onClick={() => handleStepClick(1)}
          className="flex cursor-pointer items-center space-x-2">
          {currentStep > 1 ? (
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
              1
            </div>
          )}
          <span className={currentStep === 1 ? "font-semibold" : "text-gray-500"}>
            Personal Details
          </span>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </div>

        <div
          onClick={() => handleStepClick(2)}
          className="flex cursor-pointer items-center space-x-2">
          {currentStep > 2 ? (
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          ) : (
            <div
              className={`flex h-6 w-6 items-center justify-center ${currentStep === 2 ? "bg-black text-white" : "bg-gray-300 text-white"} rounded-full`}>
              2
            </div>
          )}
          <span className={currentStep === 2 ? "font-semibold" : "text-gray-500"}>
            Bank/KYC
          </span>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </div>

        <div
          onClick={() => handleStepClick(3)}
          className="flex cursor-pointer items-center space-x-2">
          <div
            className={`flex h-6 w-6 items-center justify-center ${currentStep === 3 ? "bg-black text-white" : "bg-gray-300 text-white"} rounded-full`}>
            3
          </div>
          <span className={currentStep === 3 ? "font-semibold" : "text-gray-500"}>
            Salary Details
          </span>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mt-8">
        {currentStep === 1 && <AddNewEmployeeForm setForms={setForms} />}
        {currentStep === 2 && employee_id && <AddBankDetails employee_id={employee_id} />}
        {currentStep === 3 && <SalaryDetailsForm />}
      </div>
    </div>
  );
}

