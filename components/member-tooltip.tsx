import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { getFullbackName, getFullName } from "@/lib/utils";

interface MemberAvatarProps {
  member: {
    id: string;
    first_name: string;
    last_name?: string;
    profile_picture?: string;
    className?: string;
  };
  className?: string;
}

export function MemberAvatar({ member, className }: MemberAvatarProps) {
  return (
    <Avatar
      key={member.id}
      className={cn(
        "-ml-2 cursor-pointer border bg-white transition-all first:-ml-2",
        className,
      )}>
      <AvatarImage src={member.profile_picture || "https://github.com/shadcn.png"} />
      <AvatarFallback>{getFullbackName(member.first_name, member.last_name)}</AvatarFallback>
    </Avatar>
  );
}

interface MemberTooltipProps {
  id: string;
  first_name: string;
  last_name?: string;
  profile_picture?: string;
}

export default function MemberTooltip({ member }: { member: MemberTooltipProps }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group flex justify-start">
            <MemberAvatar member={member} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getFullName(member.first_name, member.last_name)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
