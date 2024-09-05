"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";
import useProjectStore from "@/model/project";
import { Project as TProject } from "@/types/dashboard";
import { api } from "@/api/api";
import { toast } from "@/hooks/use-toast";
import { formatISODate, getFullName } from "@/lib/utils";
import { Icons } from "@/components/Icons";

export default function Project() {
  const [isLoading, setIsLoading] = useState(false);
  const { activeProject } = useProjectStore();
  const [project, setProject] = useState<TProject | null>(null);

  useEffect(() => {
    async function getProjectDetail() {
      setIsLoading(true);
      try {
        const res = await api.get<TProject>("/api/project_management/projects-details/", {
          params: {
            project_id: activeProject,
          },
        });
        setProject(res.data);
      } catch (err) {
        toast({
          description: "Failed to fetch project detailsi. Please try agin later!",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    if (activeProject) {
      getProjectDetail();
    }
  }, [activeProject]);

  if (!project) {
    return <h1>Please select a project</h1>;
  }

  return (
    <Card
      className={cn("relative h-[407px] w-full max-w-sm p-4 overflow-hidden", {
        // "before:absolute before:inset-0 before:bg-white": !isLoading,
      })}>
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icons.loader />
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-base font-bold">{project?.project_name}</h2>
            <Button variant="link" className="-mt-5 text-xs text-muted-foreground">
              View more
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{project?.description}</p>
          <p className="mt-2 text-sm font-semibold">
            Deadline : {formatISODate(project?.end_date)}
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground">Project Heads</h3>
        <div className="mt-2 flex space-x-4">
          {project.assigned_employees.map((employee) => (
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={employee.profile_picture || "https://randomuser.me/api/portraits/men/1.jpg"}
                  alt="Full Name"
                />
                <AvatarFallback>FN</AvatarFallback>
              </Avatar>
              <p className="text-xs">{getFullName(employee.first_name, employee.last_name)}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
