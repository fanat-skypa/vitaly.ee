'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Pencil, Save, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ChecklistProps {
  initialTasks: Task[];
  projectId: string;
  isAdmin: boolean;
  onTasksChange?: (tasks: Task[]) => void;
}

export function Checklist({ initialTasks, isAdmin, onTasksChange }: ChecklistProps) {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    onTasksChange?.(newTasks);
  };

  const handleAddTask = () => {
    if (!editingText.trim()) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: editingText.trim(),
      completed: false,
    };
    saveTasks([...tasks, newTask]);
    setEditingText('');
    toast({ title: 'Added', description: 'Task added' });
  };

  const handleEditStart = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleEditSave = (taskId: string) => {
    if (!editingText.trim()) return;
    saveTasks(tasks.map(t => t.id === taskId ? { ...t, text: editingText } : t));
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleToggle = (taskId: string) => {
    saveTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (taskId: string) => {
    saveTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <Card className="bg-transparent shadow-none border-none">
      {tasks.length > 0 && (
        <CardHeader className="pt-0 pb-1">
          <CardTitle className="font-headline text-lg">Checklist</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-2 pt-1">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between group">
            {editingTaskId === task.id && isAdmin ? (
              <div className="flex gap-2 flex-grow items-center">
                <Input value={editingText} onChange={e => setEditingText(e.target.value)} />
                <Button size="icon" variant="ghost" onClick={() => handleEditSave(task.id)}><Save /></Button>
                <Button size="icon" variant="ghost" onClick={() => setEditingTaskId(null)}><X /></Button>
              </div>
            ) : (
              <>
                <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => handleToggle(task.id)} disabled={!isAdmin} />
                <span className={`flex-grow ml-2 ${task.completed ? 'text-gray-400 opacity-70' : ''}`}>
                  {task.text}
                </span>
                {isAdmin && (
                  <div className="flex gap-1 opacity-80">
                    <Button size="icon" variant="ghost" onClick={() => handleEditStart(task)}><Pencil /></Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(task.id)}><Trash2 /></Button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {isAdmin && (
          <div className="flex gap-2 mt-2">
            <Input value={editingText} onChange={e => setEditingText(e.target.value)} placeholder="New task..." maxLength={100} />
            <Button onClick={handleAddTask}><PlusCircle /></Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
