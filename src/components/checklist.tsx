'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import type { Task } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Pencil, Save, X } from 'lucide-react';

interface ChecklistProps {
  initialTasks: Task[];
}

const taskSchema = z.object({
  text: z.string().min(1, 'Task cannot be empty').max(100, 'Task is too long'),
});

export function Checklist({ initialTasks }: ChecklistProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { text: '' },
  });

  const handleAddTask = (values: z.infer<typeof taskSchema>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: values.text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    form.reset();
    toast({ title: 'Success', description: 'Task added.' });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({ title: 'Success', description: 'Task removed.' });
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleEditStart = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleEditSave = (taskId: string) => {
    if (editingText.trim() === '') {
        toast({ title: 'Error', description: 'Task cannot be empty.', variant: 'destructive' });
        return;
    }
    setTasks(tasks.map(task => task.id === taskId ? { ...task, text: editingText } : task));
    handleEditCancel();
    toast({ title: 'Success', description: 'Task updated.' });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-4 p-4 rounded-lg">
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center group">
            {editingTaskId === task.id && isAdmin ? (
                <div className="flex-grow flex items-center gap-2">
                    <Input value={editingText} onChange={(e) => setEditingText(e.target.value)} className="h-9"/>
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => handleEditSave(task.id)}><Save className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={handleEditCancel}><X className="h-4 w-4" /></Button>
                </div>
            ) : (
                <>
                    <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id)}
                        disabled={!isAdmin}
                        className="mr-3"
                    />
                    <label
                        htmlFor={task.id}
                        className={`flex-grow text-sm ${
                        task.completed ? 'line-through text-muted-foreground' : ''
                        }`}
                    >
                        {task.text}
                    </label>
                    {isAdmin && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleEditStart(task)}><Pencil className="h-4 w-4"/></Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteTask(task.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    )}
                </>
            )}

          </li>
        ))}
      </ul>
      {isAdmin && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddTask)}
            className="flex items-start gap-2 pt-4 border-t"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="Add a new task..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" className="shrink-0">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
