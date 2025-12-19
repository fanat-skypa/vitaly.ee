import { NextRequest, NextResponse } from 'next/server';
import { addProject, getProjects, updateProject, deleteProject } from '@/lib/projects';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name || !data.repoUrl) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  const project = await addProject(data);
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await updateProject(params.id, data);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteProject(params.id);
  return NextResponse.json({ success: true });
}
