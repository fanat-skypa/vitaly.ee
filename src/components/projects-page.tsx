'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async () => {
    const newProject = {
      name: 'New Project',
      description: 'Project description',
      repoUrl: '',
      tasks: [],
    };
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    const created = await res.json();
    setProjects([...projects, created]);
    toast({ title: 'Added', description: 'New project created' });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p.id !== id));
    toast({ title: 'Deleted', description: 'Project removed' });
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
    setModalOpen(true);
  };

  const saveEdit = async (updated: Project) => {
    const { id, ...data } = updated;
    await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setProjects(projects.map(p => (p.id === id ? updated : p)));
    setModalOpen(false);
    toast({ title: 'Saved', description: 'Project updated' });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline break-words">My Projects</h1>
      </div>

      <div className="space-y-12">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Button onClick={handleAdd}>Add Project</Button>
      </div>

      {modalOpen && editProject && (
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <div className="bg-white rounded-lg max-w-lg p-6 mx-auto mt-20 space-y-4">
            <h2 className="text-2xl font-bold mb-2">Edit Project</h2>
            <Input
              value={editProject.name}
              onChange={e => setEditProject({ ...editProject, name: e.target.value })}
              placeholder="Project Name"
              maxLength={200}
            />
            <Textarea
              value={editProject.description}
              onChange={e => setEditProject({ ...editProject, description: e.target.value })}
              placeholder="Project Description"
              rows={4}
              maxLength={1000}
            />
            <Input
              value={editProject.repoUrl}
              onChange={e => setEditProject({ ...editProject, repoUrl: e.target.value })}
              placeholder="Repository URL"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => saveEdit(editProject)}>Save</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
