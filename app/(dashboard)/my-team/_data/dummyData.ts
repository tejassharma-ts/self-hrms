import { LeavesResponse } from "@/types/types";

export const leaveData: LeavesResponse = {
  leaves_request: [
    {
      id: "3926c756-161b-4b29-9cff-656d5febe3c6",
      employee: {
        id: "01268b81-7d10-436a-8192-1d4f88b47645",
        first_name: "Rubi",
        last_name: "Rajpoot",
        email: "sharmatejas000@gmail.com",
        phone_number: "8383838383",
        department: "Tech",
        profile_picture:
          "https://cPIEIE5&Signature=1Vs9f3kHNE1krLL8j7gC0mHxbgE%3D&Expires=1727345195",
      },
      leave_type: "Privilege",
      start_date: "2024-10-01",
      end_date: "2024-10-02",
      reason: "Ghar Jaana Hai",
      status: "Approved",
      applied_at: "2024-09-25T19:15:30.922249+05:30",
      reviewed_at: "2024-09-25T19:15:46.793606+05:30",
      leave_duration: null,
      rejection_reason: null,
      company: "f619fb18-cbbb-411b-a55c-ea85320cd2fd",
      reviewer: "46ac9b24-a228-41a0-a8e8-929cf24befe6",
    },
  ],
  leaves_request_count: 1,
  employee_leave_stats: {
    total_casual_leaves: 12,
    casual_leave_balance: 12,
    total_sick_leaves: 10,
    sick_leave_balance: 10,
    privilege_leave_balance: 15,
    total_privilege_leaves: 15,
    used_privilege_leaves: 0,
  },
};
