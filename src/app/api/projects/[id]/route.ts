import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db('vitaly_db');

  const project = await db
    .collection('projects')
    .findOne({ _id: new ObjectId(params.id) });

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    ...project,
    id: project._id.toString(),
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db('vitaly_db');

  await db.collection('projects').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: data }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db('vitaly_db');

  await db
    .collection('projects')
    .deleteOne({ _id: new ObjectId(params.id) });

  return NextResponse.json({ ok: true });
}
