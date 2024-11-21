import { create } from "zustand";
import { EmployeeApplication, Meeting } from "@/types/dashboard";

type EventState = {
  meetings: Meeting[];
  interviews: EmployeeApplication[];
  setMeetings: (meetings: Meeting[]) => void;
  setInterviews: (interviews: EmployeeApplication[]) => void;
};

const useEventStore = create<EventState>((set) => ({
  meetings: [],
  interviews: [],
  setMeetings: (meetings) => set({ meetings }),
  setInterviews: (interviews) => set({ interviews }),
}));

export default useEventStore;
