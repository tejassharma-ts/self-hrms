import { cookies } from "next/headers";

export const isUserAuthenticated = () => {
  const cookieStore = cookies();
  const isAuthenticated = !!cookieStore.get("access_token");
  // TODO: might need to check if the access_token is valid ?
  return isAuthenticated;
};
