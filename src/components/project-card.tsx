import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessagesSquare, Github } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full transition-transform transform hover:-translate-y-1 duration-200 ease-in-out shadow-md hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline">{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href={`/projects/${project.id}`}>
            <MessagesSquare className="mr-2 h-4 w-4" />
            Comments
          </Link>
        </Button>
        <Button asChild>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Repository
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
