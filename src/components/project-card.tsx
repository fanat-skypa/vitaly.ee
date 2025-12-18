'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Github } from 'lucide-react';
import type { Project } from '@/lib/types';
import { checklists } from '@/lib/data';
import { Checklist } from './checklist';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectChecklist = checklists.find((c) => c.projectId === project.id);

  return (
    <Card className="glass-card flex flex-col h-full overflow-hidden">
      <CardHeader className="p-6">
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="group">
          <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors flex items-center gap-2">
            {project.name}
            <Github className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </CardTitle>
        </a>
        <CardDescription className="pt-1">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow grid md:grid-cols-1 gap-px bg-white/20 p-0">
          {projectChecklist ? (
              <div className="bg-card/50">
                <Checklist initialTasks={projectChecklist.tasks} />
              </div>
          ) : (
              <div className="p-6 text-muted-foreground text-center flex items-center justify-center bg-card/50">No checklist for this project.</div>
          )}
      </CardContent>
    </Card>
  );
}
