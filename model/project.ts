import { create } from "zustand";

type Project = {
  id: string;
  name: string;
  description?: string;
  [key: string]: any;
};

interface ProjectState {
  activeProject: Project | null;
  setActiveProject: (project: Project) => void;
  resetActiveProject: () => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  resetActiveProject: () => set({ activeProject: null }),
}));

export default useProjectStore;
