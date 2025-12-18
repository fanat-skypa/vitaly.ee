'use client';

import { notFound } from 'next/navigation';
import { projects, comments as allComments } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { CommentForm } from '@/components/comment-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();

  const project = projects.find((p) => p.id === params.id);
  const comments = allComments.filter((c) => c.projectId === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tighter">
          {project.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          {project.description}
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-headline">Comments</h2>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  <Avatar>
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className='w-full'>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold">{comment.author}</CardTitle>
                      <CardDescription className="text-xs">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='pl-16'>
                  <p className="text-sm text-foreground/80">{comment.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to leave one!
          </p>
        )}
      </section>

      {user ? (
        <CommentForm projectId={project.id} />
      ) : (
        <Card className="text-center py-8">
            <CardHeader>
                <CardTitle className="font-headline">Join the conversation</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Please log in to leave a comment.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
