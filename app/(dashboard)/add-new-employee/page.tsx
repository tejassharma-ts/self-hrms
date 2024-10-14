import StepperForms from "./_components/StepperForm";

type NewEmployeePageProps = {
  searchParams: {
    employee_id?: string;
    active_form: EmployeeFormSteps;
  };
};

export const dynamic = "force-dynamic";

export default async function NewEmployeePage({ searchParams }: NewEmployeePageProps) {
  const { employee_id, active_form = "personal-detail" } = searchParams;

  return <StepperForms activeForm={active_form} employeeID={employee_id} />;
}
