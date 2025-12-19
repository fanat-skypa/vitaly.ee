import { getProjects } from '@/lib/projects';
import ProjectsClient from './projects-client';

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tighter">
          My Projects
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          A collection of my open-source and personal projects.
        </p>
      </div>

      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
