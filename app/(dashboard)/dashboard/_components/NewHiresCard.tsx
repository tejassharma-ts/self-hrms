import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiServer, getAuthHeader } from "@/lib/server/api";
import { NewHire } from "@/types/dashboard";
import { delay, getFullName } from "@/lib/utils";

async function getNewHire() {
  try {
    const res = await apiServer.get<NewHire[]>(
      "/api/companies-app/company/newly-hired/",
      getAuthHeader(),
    );
    return res.data;
  } catch (err) {
    // console.log("err", err);
  }
}

export default async function NewHiresCard() {
  await delay(3000);
  const newHires = await getNewHire();

  if (!newHires) {
    return <h1>Opps failed to fetch data</h1>;
  }

  return (
    <Card className="mx-auto h-48 w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 px-4">
        <CardTitle className="text-[21px] font-bold">New Hires</CardTitle>
        <Button variant="ghost" className="text-[11px]">
          View more
        </Button>
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
              <Button variant="outline" size="sm" className="h-7 px-5">
                Send
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
