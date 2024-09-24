import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmployeeState {
  employee_id: string | null;
  employeeEditId: string | null;
  setEmployeeId: (id: string) => void;
  setEmployeeEditId: (id: string) => void;
}

const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employee_id: null,
      employeeEditId: null,
      setEmployeeId: (id: string) => set({ employee_id: id }),
      setEmployeeEditId: (id: string) => set({ employeeEditId: id }),
    }),
    {
      name: "employee_id",
    },
  ),
);

export default useEmployeeStore;
