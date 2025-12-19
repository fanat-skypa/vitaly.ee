import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

import { updateTask } from '@/lib/projects';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  if (!data.tasks) return NextResponse.json({ error: 'Tasks required' }, { status: 400 });
  await updateTask(params.id, data.tasks);
  return NextResponse.json({ success: true });
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { taskId } = await req.json();
  const client = await clientPromise;
  const db = client.db('vitaly_db');

  const project = await db.collection('projects').findOne({ _id: new ObjectId(params.id) });
  if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

  const updatedTasks = (project.tasks || []).filter((t: any) => t.id !== taskId);
  await db.collection('projects').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { tasks: updatedTasks } }
  );

  return NextResponse.json({ message: 'Task deleted', tasks: updatedTasks });
}
