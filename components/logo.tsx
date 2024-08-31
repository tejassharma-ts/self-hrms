import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type LogoProps = {
  isCollapsed: boolean;
};
export default function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="flex w-full items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://mighty.tools/mockmind-api/content/abstract/47.jpg" />
        <AvatarFallback>RIP</AvatarFallback>
      </Avatar>
      {!isCollapsed && <span className="font-medium whitespace-nowrap">Company name</span>}
    </div>
  );
}
