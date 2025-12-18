import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { checklists, projects } from '@/lib/data';
import { Checklist } from '@/components/checklist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function ChecklistPage() {
  const projectsWithChecklists = projects.filter((p) =>
    checklists.some((c) => c.projectId === p.id)
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tighter">
          Project Checklists
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Track the progress of various projects. Editing is restricted to admins.
        </p>
      </div>

      {projectsWithChecklists.length > 0 ? (
        <Card>
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                {projectsWithChecklists.map((project) => {
                    const checklist = checklists.find((c) => c.projectId === project.id);
                    if (!checklist) return null;

                    return (
                    <AccordionItem value={`item-${project.id}`} key={project.id}>
                        <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline">
                        {project.name}
                        </AccordionTrigger>
                        <AccordionContent>
                        <Checklist initialTasks={checklist.tasks} />
                        </AccordionContent>
                    </AccordionItem>
                    );
                })}
                </Accordion>
            </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-12">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3 w-fit">
                    <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="font-headline mt-4">No Checklists Available</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">There are currently no checklists to display.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
