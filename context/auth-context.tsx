"use client";

import { getAuthCookie, getSessionUserFromCookie, /* removeAuthCookies */ } from "@/lib/client/auth";
import { CompanyAccount, UserAccount } from "@/types/auth";
import useAuthStore from "@/model/auth";
// import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiCaller } from "@/lib/auth";

type AuthContextProps = {
  isLoading: boolean;
  authCompany: CompanyAccount | null;
  authUser: UserAccount | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutCleanup: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const router = useRouter();
  const { logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [authCompany, setAuthCompany] = useState<CompanyAccount | null>(null);
  const [authUser, setAuthUser] = useState<UserAccount | null>(null);

  const logoutCleanup = () => {
    setAuthUser(null);
  };

  async function loadUserDataFromServer() {
    try {
      setIsLoading(true);
      const session = getSessionUserFromCookie();

      if (!session) {
        await logout();
        throw new Error("Session is invalid or expired, logged out");
      }

      const accessToken = getAuthCookie();
      if (!accessToken) {
        await logout();
        throw new Error("Authentication token is missing");
      }

      apiCaller.defaults.headers.Authorization = `Bearer ${accessToken}`;
      if (session.role === "company") {
        await fetchCompanyData();
      } else if (session.role === "employee") {
        await fetchUserData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCompanyData() {
    try {
      const res = await apiCaller.get<CompanyAccount>("/api/companies-app/company/profile/");
      setAuthCompany(res.data);
    } catch (err) {
      throw new Error("Failed to fetch company.");
    }
  }

  async function fetchUserData() {
    try {
      const res = await apiCaller.get<UserAccount>("/api/auth/user-details/");
      setAuthUser(res.data);
    } catch (err) {
      throw new Error("Failed to fetch user details.");
    }
  }

  useEffect(() => {
    loadUserDataFromServer();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, logoutCleanup, isLoading, setIsLoading, authCompany }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useClientAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
