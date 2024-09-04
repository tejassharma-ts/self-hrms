import { create } from "zustand";
import { z } from "zod";
import { api, apiPublic } from "@/api/api";
import { SigninFormSchemaWithOTP } from "@/validations/auth";
import { setCookie } from "cookies-next";
import { getAuthCookie, removeAuthCookies, setSessionDataCookie } from "@/lib/client/auth";

type LoginApiRes = {
  access: string;
  company_id: string;
  company_name: string;
  role: "company" | "employee";
};

type AuthState = {
  // setAuth: (isAuth: boolean) => void;

  login: (data: z.infer<typeof SigninFormSchemaWithOTP>) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuthStore = create<AuthState>()((set) => ({
  // setAuth: (isAuth: boolean) => set({ isAuth }),
  login: async (formData) => {
    try {
      const res = await apiPublic.post<LoginApiRes>("/api/auth/login-with-otp/", formData);
      const { company_id, access, role } = res.data;
      setSessionDataCookie({ company_id, role });

      // TODO: access_token should be store in client is "NON" http only cookie
      setCookie("access_token", access);
    } catch (err) {
      throw err;
    }
  },

  logout: async () => {
    try {
      const accessToken = getAuthCookie();
      if (!accessToken) return;
      await api.post("api/auth/revoke-access-token/", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      removeAuthCookies();
    } catch (err) {
      throw err;
    }
  },
}));

export default useAuthStore;
