'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  comment: z
    .string()
    .min(2, { message: 'Comment must be at least 2 characters.' })
    .max(500, { message: 'Comment must not exceed 500 characters.' }),
});

export function CommentForm({ projectId }: { projectId: string }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, projectId }); // In a real app, this would be a server action
    toast({
      title: 'Comment Submitted!',
      description: 'Your comment has been posted.',
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts on this project..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
