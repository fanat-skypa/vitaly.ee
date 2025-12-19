'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Task } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Form, FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ChecklistProps {
  initialTasks: Task[];
  projectId: string;
  isAdmin: boolean;
}

const taskSchema = z.object({
  text: z.string().min(1, 'Task cannot be empty').max(100, 'Task is too long'),
});

export function Checklist({ initialTasks, projectId, isAdmin }: ChecklistProps) {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { text: '' },
  });

  const updateServer = async (updatedTasks: Task[]) => {
    try {
      await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTasks),
      });
      setTasks(updatedTasks);
    } catch {
      toast({ title: 'Error', description: 'Failed to update tasks', variant: 'destructive' });
    }
  };

  const handleAdd = (values: z.infer<typeof taskSchema>) => {
    const newTask: Task = { id: `task-${Date.now()}`, text: values.text, completed: false };
    const updated = [...tasks, newTask];
    updateServer(updated);
    form.reset();
  };

  const handleToggle = (taskId: string) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    updateServer(updated);
  };

  const handleDelete = (taskId: string) => {
    const updated = tasks.filter(t => t.id !== taskId);
    updateServer(updated);
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-2">
            <Checkbox checked={task.completed} onCheckedChange={() => handleToggle(task.id)} disabled={!isAdmin} />
            <span className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.text}</span>
            {isAdmin && <Button size="icon" variant="ghost" onClick={() => handleDelete(task.id)}><Trash2 className="w-4 h-4" /></Button>}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAdd)} className="flex gap-2 mt-2">
            <FormField control={form.control} name="text" render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder="Add task..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" size="icon"><PlusCircle className="w-4 h-4" /></Button>
          </form>
        </Form>
      )}
    </div>
  );
}
