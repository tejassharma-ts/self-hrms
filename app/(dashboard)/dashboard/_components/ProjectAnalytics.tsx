import { Card, CardContent, CardFooter } from "@/components/ui/card";
import BarChartComponent from "./BarChartComponent";
import { delay } from "@/lib/utils";
import AddNewProject from "../_modals/AddNewProject";

const data = [
  { name: "A", uv: 40 },
  { name: "B", uv: 32 },
  { name: "C", uv: 63 },
  { name: "D", uv: 32 },
  { name: "E", uv: 52 },
  { name: "F", uv: 23 },
  { name: "G", uv: 34 },
  { name: "H", uv: 32 },
  { name: "I", uv: 48 },
  { name: "J", uv: 100 },
];

export default async function ProjectAnalytics() {
  // fetch the chat data

  return (
    <>
      <Card className="w-full h-[407px] max-w-3xl">
        <CardContent className="p-6">
          <BarChartComponent data={data} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <AddNewProject />
        </CardFooter>
      </Card>
    </>
  );
}
