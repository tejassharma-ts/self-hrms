'use client';
import { useState } from "react";
import AddNewEmployeeForm from "./_components/AddNewEmployeeForm";
import SalaryDetailsForm from "./_components/SalaryDetailsForm";
import { CheckCircleIcon, ChevronRightIcon } from "lucide-react";
import AddBankDetails from "./_components/AddBankdetails";

export default function StepperForms() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleStepClick = (step: number) => {
        setCurrentStep(step);
    };

    return (
        <div className="p-4 bg-[#F8F9FA]">

            <h1 className="text-3xl font-bold mb-10 px-8">Add New Employee</h1>
            <div className="flex items-center justify-between w-full py-4 px-8 rounded-md">
                <div
                    onClick={() => handleStepClick(1)}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    {currentStep > 1 ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    ) : (
                        <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full">
                            1
                        </div>
                    )}
                    <span className={currentStep === 1 ? "font-semibold" : "text-gray-500"}>
                        Personal Details
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>


                <div
                    onClick={() => handleStepClick(2)}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    {currentStep > 2 ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    ) : (
                        <div className={`flex items-center justify-center w-6 h-6 ${currentStep === 2 ? "bg-black text-white" : "bg-gray-300 text-white"} rounded-full`}>
                            2
                        </div>
                    )}
                    <span className={currentStep === 2 ? "font-semibold" : "text-gray-500"}>
                        Bank Details
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>


                <div
                    onClick={() => handleStepClick(3)}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    <div className={`flex items-center justify-center w-6 h-6 ${currentStep === 3 ? "bg-black text-white" : "bg-gray-300 text-white"} rounded-full`}>
                        3
                    </div>
                    <span className={currentStep === 3 ? "font-semibold" : "text-gray-500"}>
                        Salary Details
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />

                </div>
            </div>


            <div className="mt-8">
                {currentStep === 1 && <AddNewEmployeeForm />}
                {currentStep === 2 && <AddBankDetails />}
                {currentStep === 3 && <SalaryDetailsForm />}
            </div>
        </div>
    );
}
