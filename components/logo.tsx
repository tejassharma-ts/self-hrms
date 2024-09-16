"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClientAuth } from "@/context/auth-context";
import LogoSkeleton from "./skeletons/LogoSkeleton";

type LogoProps = {
  isCollapsed: boolean;
};

export default function Logo({ isCollapsed }: LogoProps) {
  const { isLoading, authCompany, authUser } = useClientAuth();

  let companyLogoUrl;
  if (authUser && authUser.company_logo) {
    companyLogoUrl = authUser.company_logo;
  } else if (authCompany && authCompany.company_logo) {
    companyLogoUrl = authCompany.company_logo;
  }

  if (isLoading) {
    return <LogoSkeleton isCollapsed={isCollapsed} />;
  }

  function renderProfile() {
    if (authCompany) {
      return (
        <>
          <Avatar>
            <AvatarImage
              src={companyLogoUrl || "https://mighty.tools/mockmind-api/content/abstract/47.jpg"}
            />
            <AvatarFallback>RIP</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <span className="whitespace-nowrap font-medium">{authCompany.company_name}</span>
          )}
        </>
      );
    } else if (authUser) {
      return (
        <>
          <Avatar>
            <AvatarImage src="https://mighty.tools/mockmind-api/content/abstract/47.jpg" />
            <AvatarFallback>RIP</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <span className="whitespace-nowrap font-medium">
              {authUser.company_name || authUser.employee_profile.company.company_name}
            </span>
          )}
        </>
      );
    }
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">{renderProfile()}</div>
  );
}
