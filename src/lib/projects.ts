import clientPromise from './mongodb';
import type { Project } from './types';
import { ObjectId } from 'mongodb';

const dbName = 'vitaly_db';
const collectionName = 'projects';

export async function getProjects(): Promise<Project[]> {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const projectsFromDb = await collection.find({}).toArray();

  return projectsFromDb.map(p => ({
    id: p._id.toString(),
    name: p.name,
    description: p.description,
    repoUrl: p.repoUrl,
    tasks: p.tasks || [],
    order: p.order,
  }));
}

export async function addProject(project: Omit<Project, 'id' | 'tasks'>): Promise<Project> {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const doc: Omit<Project, 'id'> & { createdAt: Date } = {
    ...project,
    tasks: [],
    createdAt: new Date(),
  };

  const result = await collection.insertOne(doc);

  return {
    id: result.insertedId.toString(),
    ...project,
    tasks: [],
  };
}

export async function updateProject(id: string, data: Partial<Project>) {
  const client = await clientPromise;
  const db = client.db(dbName);
  await db.collection(collectionName).updateOne({ _id: new ObjectId(id) }, { $set: data });

  const updated = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
  if (!updated) throw new Error('Project not found');

  return {
    id: updated._id.toString(),
    name: updated.name,
    description: updated.description,
    repoUrl: updated.repoUrl,
    tasks: updated.tasks || [],
    order: updated.order,
  };
}

export async function deleteProject(id: string) {
  const client = await clientPromise;
  const db = client.db(dbName);
  await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
}

export async function updateTask(
  projectId: string,
  tasks: { id: string; text: string; completed: boolean }[]
) {
  const client = await clientPromise;
  const db = client.db(dbName);
  await db.collection(collectionName).updateOne(
    { _id: new ObjectId(projectId) },
    { $set: { tasks } }
  );
}
