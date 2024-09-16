"use client";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/model/auth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useClientAuth } from "@/context/auth-context";

export default function Navbar() {
  const { logout } = useAuthStore();
  const router = useRouter();

  async function onLogout() {
    try {
      await logout();
      toast({
        description: "You are logged out successfully",
      });
      return router.push("/register");
    } catch (err) {
      console.log("This is error", err);
      toast({
        description: "Something went wrong. Please try again later!",
        variant: "destructive",
      });
    }
  }
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-end bg-slate-50">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
