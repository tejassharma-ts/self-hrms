import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewHire } from "@/types/dashboard";
import { getFullName } from "@/lib/utils";
import { apiCaller } from "@/lib/auth";
import { cookies } from "next/headers";
import { format } from "date-fns";

async function getNewHire() {
  try {
    const res = await apiCaller.get<NewHire[]>("/api/companies-app/company/newly-hired/", {
      headers: {
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    return res.data;
  } catch (err) {
    // console.log("err", err);
  }
}

export default async function NewHiresCard() {
  const newHires = await getNewHire();

  if (!newHires) {
    return <h1>Opps failed to fetch data</h1>;
  }

  return (
    <Card className="mx-auto h-48 w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 px-4">
        <CardTitle className="flex items-center justify-between text-[21px] font-bold w-full">
          <span>New Hires</span>
          <span className="text-xs">{format(new Date(), "MMMM, yyyy")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-28 w-full pr-4">
          {newHires.map((seeker) => (
            <div key={seeker.id} className="mb-4 flex items-center justify-between last:mb-0">
              <div className="flex flex-col space-y-0.5">
                <h3 className="font-semibold">
                  {getFullName(seeker.first_name, seeker.last_name)}
                </h3>
                <p className="text-sm text-gray-500">{seeker.position}</p>
              </div>
              <div className="flex flex-col space-y-1 text-xs">
                <span className="font-medium">Joined in</span>
                <span>{format(new Date(seeker.date_joined), "MMMM do, yyyy")}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
