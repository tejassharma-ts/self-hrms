import type { NextRequest } from "next/server";

const publicAccessPages = ["/register", "/login"];
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("access_token")?.value;

  const isPublicPage = publicAccessPages.some((page) => request.nextUrl.pathname.startsWith(page));

  if (currentUser && isPublicPage) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !isPublicPage) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
