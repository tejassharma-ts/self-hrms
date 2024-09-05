// TODO: make the necessary api for user authentication on client side
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

export function getAuthCookie() {
  return getCookie("access_token");
}

export function removeAuthCookies() {
  if (hasCookie("access_token")) deleteCookie("access_token");
  if (hasCookie("session")) deleteCookie("session");
}

export type SessionData = {
  company_id: string;
  role: "employee" | "company";
};

// api will store company_id and the role in the cookie(not httponly) will use this for client side rendering logic
export function setSessionDataCookie(session: SessionData) {
  setCookie("session", JSON.stringify(session));
}

export function getSessionUserFromCookie(): SessionData | null {
  const session = getCookie("session");
  if (!session) {
    return null;
  }
  try {
    return JSON.parse(session);
  } catch (error) {
    return null;
  }
}
