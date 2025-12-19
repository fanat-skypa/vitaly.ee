'use client'; 

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types'; // <-- импорт типа

interface ProjectEditDialogProps {
  project: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export function ProjectEditDialog({ project, onClose, onSave }: ProjectEditDialogProps) {
  const [editedProject, setEditedProject] = useState<Project>(project);

  const handleChange = (field: keyof Project, value: string) => {
    setEditedProject({ ...editedProject, [field]: value });
  };

  const handleSubmit = () => {
    onSave(editedProject);
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        <Input
          value={editedProject.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Project Name"
        />
        <Input
          value={editedProject.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
        />
        <Input
          value={editedProject.repoUrl}
          onChange={(e) => handleChange('repoUrl', e.target.value)}
          placeholder="Repository URL"
        />
        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}
