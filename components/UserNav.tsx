"use client";

import useAuthStore from "@/model/auth";
import { toast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeAuthCookies } from "@/lib/client/auth";
import { useClientAuth } from "@/context/auth-context";
import { getPageTitle } from "@/data/page-title";

export function UserNav() {
  const { authUser, authCompany } = useClientAuth();
  const { logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  let companyLogoUrl;
  if (authUser && authUser.company_logo) {
    companyLogoUrl = authUser.company_logo;
  } else if (authCompany && authCompany.company_logo) {
    companyLogoUrl = authCompany.company_logo;
  }

  async function onLogout() {
    try {
      toast({
        description: "You are about to logged out",
      });
      await logout();
      toast({
        description: "You are logged out successfully",
      });
    } catch (err) {
      removeAuthCookies();
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      router.push("/auth");
    }
  }

  return (
    <>
      <h1 className="text-lg font-semibold">{getPageTitle(pathname)}</h1>
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src={
                    companyLogoUrl || "https://mighty.tools/mockmind-api/content/abstract/47.jpg"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>RIP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28" align="end" forceMount>
            {/* <DropdownMenuLabel className="font-normal"> */}
            {/*   <div className="flex flex-col space-y-1"> */}
            {/*     <p className="text-sm font-medium leading-none">Admin</p> */}
            {/*     <p className="text-xs leading-none text-muted-foreground">name@something.com</p> */}
            {/*   </div> */}
            {/* </DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup> */}
            {/*   <DropdownMenuItem> */}
            {/*     Profile */}
            {/*     <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            {/*   </DropdownMenuItem> */}
            {/*   <DropdownMenuItem> */}
            {/*     Billing */}
            {/*     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            {/*   </DropdownMenuItem> */}
            {/*   <DropdownMenuItem> */}
            {/*     Settings */}
            {/*     <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            {/*   </DropdownMenuItem> */}
            {/*   <DropdownMenuItem>New Team</DropdownMenuItem> */}
            {/* </DropdownMenuGroup> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={onLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
