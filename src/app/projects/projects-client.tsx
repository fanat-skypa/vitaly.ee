'use client';

import { useState, useEffect } from 'react';
import type { Project, Task } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ProjectEditDialog } from './project-edit-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (project: Project) => {
    if (project.id && project.id.startsWith('temp-')) {
      // Create new project
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, tasks: [] }),
      });
      const created = await res.json();
      setProjects(prev => prev.map(p => (p.id === project.id ? created : p)));
      toast({ title: 'Added', description: 'Project created' });
    } else {
      // Update existing
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const updated = await res.json();
      setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      toast({ title: 'Saved', description: 'Project updated' });
    }
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Deleted', description: 'Project removed' });
  };

  const handleTasksChange = async (projectId: string, tasks: Task[]) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const updatedProject = { ...project, tasks };
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    });
    setProjects(prev => prev.map(p => (p.id === projectId ? updatedProject : p)));
  };

  const handleCreate = () => {
    setEditingProject({
      id: `temp-${Date.now()}`, // временный уникальный ID
      name: '',
      description: '',
      repoUrl: '',
      tasks: [],
    });
    setProjects(prev => [...prev, {
      id: `temp-${Date.now()}`,
      name: '',
      description: '',
      repoUrl: '',
      tasks: [],
    }]);
  };

  return (
    <>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id ?? `project-${index}`}
            project={project}
            onEdit={() => setEditingProject(project)}
            onDelete={handleDelete}
            onTasksChange={handleTasksChange}
          />
        ))}
      </div>

      {isAdmin && (
        <div className="flex justify-center pt-6">
          <Button onClick={handleCreate}>Add Project</Button>
        </div>
      )}

      {editingProject && (
        <ProjectEditDialog
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
