import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';

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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const avatarImage = PlaceHolderImages.find((img) => img.id === 'dev-avatar');

  return (
    <div className="flex justify-center items-start pt-8">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center p-8">
          <div className="flex justify-center mb-6">
            <Avatar className="h-32 w-32">
              {avatarImage && (
                <AvatarImage
                  src={avatarImage.imageUrl}
                  alt={developerInfo.name}
                  data-ai-hint={avatarImage.imageHint}
                />
              )}
              <AvatarFallback>{developerInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="font-headline text-4xl font-bold tracking-tighter">
            {developerInfo.name}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            {developerInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <h3 className="text-xl font-headline font-semibold mb-4 text-center">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {developerInfo.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-8 bg-muted/50 rounded-b-lg">
          <Button asChild variant="outline">
            <a href={developerInfo.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={developerInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
