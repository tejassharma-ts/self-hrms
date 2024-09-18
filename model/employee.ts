import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmployeeState {
  employee_id: string | null;
  setEmployeeId: (id: string) => void;
}

const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employee_id: null,
      setEmployeeId: (id: string) => set({ employee_id: id }),
    }),
    {
      name: "employee_id",
    },
  ),
);

export default useEmployeeStore;
