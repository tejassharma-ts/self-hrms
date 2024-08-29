import React from 'react';
import { Box } from 'lucide-react';

interface Project {
  name: string;
  date: string;
}

interface ProjectTimelineProps {
  ongoingProjects: Project[];
  completedProjects: Project[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ ongoingProjects, completedProjects }) => {
  const renderProjects = (projects: Project[], title: string, count: number) => (
    <div className="mb-6">
      <h2 className=" text-[#0A0B0A] font-extrabold mb-2">{title} ({count})</h2>
      {projects.map((project, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className="flex flex-col items-center mr-4">
            <Box className="text-red-500 mb-1" size={24} />
            {index !== projects.length - 1 && (
              <div className="w-0.5 h-12 bg-gray-300"></div>
            )}
          </div>
          <div>
            <p className="text-[#2D3748] text-sm">{project.name}</p>
            <p className="text-xs font-bold text-[#A0AEC0]">{project.date}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-[300px]  mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl text-[#2D3748]  font-bold mb-6">Project Timeline</h1>
      {renderProjects(ongoingProjects, "Ongoing Project", ongoingProjects.length)}
      {renderProjects(completedProjects, "Completed Projects", completedProjects.length)}
    </div>
  );
};

export default function App() {
  const ongoingProjects: Project[] = [
    { name: "Project Name", date: "21 DEC 11:21 PM" },
    { name: "Project Name", date: "21 DEC 11:21 PM" },
  ];

  const completedProjects: Project[] = [
    { name: "Project Name", date: "21 DEC 11:21 PM" },
    { name: "Project Name", date: "21 DEC 11:21 PM" },
    { name: "FrameJar", date: "21 DEC 11:21 PM" },
  ];

  return <ProjectTimeline ongoingProjects={ongoingProjects} completedProjects={completedProjects} />;
}