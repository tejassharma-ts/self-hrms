import { Button } from "@/components/ui/button";
import Logo from "./logo";

export default function Nav() {
  return (
    <nav className="mx-auto flex h-28 max-w-[1400px] items-center justify-between px-3 z-20 relative">
      <Logo />

      <div className="flex space-x-4">
        <Button variant="ghost" className="text-white hover:bg-[#24272b] hover:text-white">
          Contact Us
        </Button>
        <Button className="relative h-[40px] border-[2.5px] border-[#24272b] bg-[#09090B] text-sm before:absolute before:-bottom-[2px] before:h-[1px] before:w-[50%] before:rounded before:bg-gradient-to-r before:from-[#24272b] before:via-[#22D3EE] before:to-[#24272b] hover:before:w-[80%] before:transition-all hover:bg-[#24272b]">
          Register Now
        </Button>
      </div>
    </nav>
  );
}
