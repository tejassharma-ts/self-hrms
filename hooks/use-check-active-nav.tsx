import { usePathname, useSearchParams } from "next/navigation";

export default function useCheckActiveNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function checkActiveNav(nav: string) {
    const [navPath, navQuery] = nav.split("?");

    if (pathname === nav) return true;
    const pathArray = pathname.split("/").filter((item) => item !== "");
    const isPathMatch =
      (navPath === "/" && pathArray.length < 1) || pathArray.includes(navPath.replace(/^\//, ""));

    if (!navQuery) return isPathMatch;

    const navParams = new URLSearchParams(navQuery);
    let allParamsMatch = true;
    navParams.forEach((value, key) => {
      if (searchParams.get(key) !== value) {
        allParamsMatch = false;
      }
    });

    return (isPathMatch && allParamsMatch) || pathname.includes(nav);
  }

  return { checkActiveNav };
}

