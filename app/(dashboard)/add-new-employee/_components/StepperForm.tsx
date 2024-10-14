import EmployeeBankDetailSkeleton from "../_skeletons/employee-bank-skeleton";
import EmployeeFormSkeleton from "../_skeletons/employee-form-skeleton";
import BankEmployeeForm from "./BankEmployeeForm";
import BasicEmployeeForm from "./BasicEmployeeInfo";
import SalaryEmployeeForm from "./SalaryEmployeeForm";
import Steps from "./Steps";
import { Suspense } from "react";

type StepperFormsProps = {
  activeForm: EmployeeFormSteps;
  employeeID?: string;
};

export default function StepperForms({ activeForm, employeeID }: StepperFormsProps) {
  return (
    <>
      <Steps />
      {activeForm === "personal-detail" && (
        <Suspense fallback={<EmployeeFormSkeleton />}>
          <BasicEmployeeForm employeeID={employeeID} />
        </Suspense>
      )}

      {activeForm === "bank-details" && (
        <Suspense fallback={<EmployeeBankDetailSkeleton />}>
          <BankEmployeeForm employeeID={employeeID} />
        </Suspense>
      )}
      {activeForm === "salary-structure" && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <SalaryEmployeeForm employeeID={employeeID} />
        </Suspense>
      )}
    </>
  );
}
