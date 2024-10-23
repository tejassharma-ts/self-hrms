import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ScreenLoader from "@/components/ScreenLoader";

export default function Loading() {
  return <ScreenLoader />;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <Tabs defaultValue="leave-request">
          <TabsList>
            <TabsTrigger value="leave-request">Leave Request</TabsTrigger>
            <TabsTrigger value="leave-balance">Leave Balance</TabsTrigger>
            <TabsTrigger value="employee-availability">Employee Availability</TabsTrigger>
            <TabsTrigger value="calender">Calender</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        <Select>
          <SelectTrigger
            className={cn(
              buttonVariants({
                variant: "default",
                className: "w-auto",
              }),
            )}>
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <h1>Loading....</h1>
      </CardContent>
    </Card>
  );
}
