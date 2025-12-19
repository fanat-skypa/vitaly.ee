'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, MoreVertical } from 'lucide-react';
import type { Project, Task } from '@/lib/types';
import { Checklist } from './checklist';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  onTasksChange?: (id: string, tasks: Task[]) => void;
}

export function ProjectCard({ project, onEdit, onDelete, onTasksChange }: ProjectCardProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Card className="glass-card flex flex-col overflow-hidden relative">
      <CardHeader className="p-6 flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <CardTitle className="font-headline text-2xl flex items-center gap-2 break-words">
              {project.name}
              <Github className="w-5 h-5 opacity-60" />
            </CardTitle>
          </a>
          <CardDescription className="pt-1 break-words text-ellipsis overflow-hidden whitespace-normal">
            {project.description}
          </CardDescription>
        </div>

        {isAdmin && (
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger className="absolute right-3 top-3">
              <MoreVertical className="w-5 h-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(project)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => project.id && onDelete?.(project.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>

      <CardContent className="flex-grow p-4 pt-2">
        <div className="min-h-[60px] flex flex-col justify-start">
          {project.id && (project.tasks && project.tasks.length > 0 ? (
            <Checklist
              initialTasks={project.tasks}
              projectId={project.id}
              isAdmin={isAdmin}
              onTasksChange={tasks => project.id && onTasksChange?.(project.id, tasks)}
            />
          ) : isAdmin ? (
            <Checklist
              initialTasks={[]}
              projectId={project.id}
              isAdmin={isAdmin}
              onTasksChange={tasks => project.id && onTasksChange?.(project.id, tasks)}
            />
          ) : (
            <div className="flex-grow" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
