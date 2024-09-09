import { Card, CardContent, CardFooter } from "@/components/ui/card";
import BarChartComponent from "./BarChartComponent";
import AddNewProject from "../_modals/AddNewProject";
import { apiServer, getAuthCookies } from "@/lib/server/api";
// import { cookies } from "next/headers";

async function getProjects() {
  try {
    // const cookieStore = cookies();
    // TODO: remove hard coded data
    const res = await apiServer.get(
      "/api/project_management/projects/create/?company=f619fb18-cbbb-411b-a55c-ea85320cd2fd",
      {
        headers: getAuthCookies(),
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function ProjectAnalytics() {
  const projects = await getProjects();

  return (
    <>
      <Card className="h-[407px] w-full max-w-3xl">
        <CardContent className="p-6">
          <BarChartComponent data={projects} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <AddNewProject />
        </CardFooter>
      </Card>
    </>
  );
}
