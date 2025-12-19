import clientPromise from './mongodb';
import type { Project } from './types';
import { ObjectId } from 'mongodb';

export async function getProjects(): Promise<Project[]> {
  const client = await clientPromise;
  const db = client.db('vitaly_db');
  const projectsCol = db.collection('projects');

  const result = await projectsCol.find().toArray();

  return result.map(p => ({
    _id: p._id.toString(),
    name: p.name,
    description: p.description,
    repoUrl: p.repoUrl,
    tasks: p.tasks || [],
  }));
}

export async function addProject(project: Omit<Project, '_id'>): Promise<Project> {
  const client = await clientPromise;
  const db = client.db('vitaly_db');
  const projectsCol = db.collection('projects');

  const res = await projectsCol.insertOne({ ...project, tasks: [] });
  return {
    _id: res.insertedId.toString(),
    ...project,
    tasks: [],
  };
}
