import { create } from "zustand";

interface SalaryStructure {
  gross?: number;
  component?: string;
}

interface EmployeeForm {
  personal?: FreshEmployee;
  salaryStructure?: SalaryStructure;
}

interface AddEmployeeState {
  form: EmployeeForm;
  setEmployeeField: (
    key: keyof EmployeeForm,
    values: Partial<EmployeeForm[keyof EmployeeForm]>,
  ) => void;
  reset: () => void;
}

// Create the Zustand store with typed state and actions
export const useAddEmployeeStore = create<AddEmployeeState>((set) => ({
  form: {
    personal: undefined,
    salaryStructure: undefined,
  },

  setEmployeeField: (key, values) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: {
          ...state.form[key],
          ...values,
        },
      },
    })),

  reset: () =>
    set(() => ({
      form: {
        personal: undefined,
        salaryStructure: undefined,
      },
    })),
}));
