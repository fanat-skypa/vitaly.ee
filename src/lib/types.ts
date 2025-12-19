// src/lib/types.ts

export interface DeveloperInfo {
  name: string;
  description: string;
  techStack: string[];
  links: {
    github: string;
    linkedin: string;
    x: string;
  };
}

export interface Project {
  _id?: string;      // из MongoDB
  id?: string;       // для фронта
  name: string;
  description: string;
  repoUrl: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  projectId: string;
  tasks: Task[];
}
