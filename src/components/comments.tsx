'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { CommentForm } from '@/components/comment-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import type { Comment } from '@/lib/types';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommentsProps {
    initialComments: Comment[];
    projectId: string;
}

export function Comments({ initialComments, projectId }: CommentsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState(initialComments);

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    toast({ title: 'Success', description: 'Comment removed.' });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <Card className="h-full bg-transparent border-none shadow-none">
        <CardHeader>
            <CardTitle className="font-headline text-lg">Comments</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {comments.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3 group">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-semibold">{comment.author}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                                </p>
                            </div>
                            <p className="text-sm text-foreground/80 mt-1">{comment.text}</p>
                        </div>
                        {isAdmin && (
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteComment(comment.id)}>
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                    ))}
                </div>
                ) : (
                <p className="text-muted-foreground text-center py-8 text-sm">
                    No comments yet.
                </p>
                )}

                {user ? (
                    <CommentForm projectId={projectId} />
                ) : (
                    <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">Please log in to leave a comment.</p>
                    </div>
                )}
            </div>
        </CardContent>
    </Card>
  );
}
