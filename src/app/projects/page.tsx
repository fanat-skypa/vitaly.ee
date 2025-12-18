import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/project-card';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tighter">
          My Projects
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          A collection of my open-source and personal projects. Click on any project to see more details.
        </p>
      </div>
      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
