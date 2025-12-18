import { Github, Linkedin, Twitter } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { developerInfo } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-4xl glass-card">
        <CardHeader className="text-center p-8">
          <CardTitle className="font-headline text-4xl font-bold tracking-tighter">
            {developerInfo.name}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {developerInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <h3 className="text-xl font-headline font-semibold mb-4 text-center">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {developerInfo.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-3 py-1 bg-white/20 border-none">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-8 bg-black/5 rounded-b-2xl">
          <Button asChild variant="ghost" className="rounded-full">
            <a href={developerInfo.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <a href={developerInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <a href={developerInfo.links.x} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
