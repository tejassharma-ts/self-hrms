import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Project() {
  return (
    <Card className="w-full h-[407px] max-w-sm p-4">
      <div className="flex justify-between items-start">
        <div className="py-4" >
          <div className="flex justify-between" >
            <h2 className="text-base mb-4 font-bold">Framejar</h2>
            <Button variant="link" className="text-xs -mt-5 text-muted-foreground">
              View more
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Figma ipsum component variant main layer. Vector export asset boolean thumbnail line draft object follower.
            Invite layer figma ellipse star polygon project.
          </p>
          <p className="mt-2 text-sm font-semibold">Deadline : 3 June 2024</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground">Project Heads</h3>
        <div className="flex space-x-4 mt-2">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="Full Name" />
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
            <p className="text-xs">Full Name</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://randomuser.me/api/portraits/women/2.jpg" alt="Full Name" />
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
            <p className="text-xs">Full Name</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
