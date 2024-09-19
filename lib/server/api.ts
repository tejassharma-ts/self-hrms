import { cookies } from "next/headers";
export function getAuthCookies() {
  return {
    Cookie: cookies()
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; "),
  };
}
