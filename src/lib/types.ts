export interface Project {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
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

export interface DeveloperInfo {
    name: string;
    description:string;
    techStack: string[];
    links: {
        github: string;
        linkedin: string;
        x: string;
    }
}
