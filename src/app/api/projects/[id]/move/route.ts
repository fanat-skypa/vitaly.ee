import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { direction } = await req.json(); // 'up' | 'down'

  const client = await clientPromise;
  const db = client.db('vitaly_db');
  const col = db.collection('projects');

  const current = await col.findOne({ _id: new ObjectId(params.id) });
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const swapWith = await col.findOne({
    order:
      direction === 'up'
        ? { $lt: current.order }
        : { $gt: current.order },
  }, {
    sort: { order: direction === 'up' ? -1 : 1 },
  });

  if (!swapWith) return NextResponse.json({ ok: true });

  await col.updateOne(
    { _id: current._id },
    { $set: { order: swapWith.order } }
  );

  await col.updateOne(
    { _id: swapWith._id },
    { $set: { order: current.order } }
  );

  return NextResponse.json({ ok: true });
}
