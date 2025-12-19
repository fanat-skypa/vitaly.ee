// globals.d.ts
import { MongoClient } from "mongodb";

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare global {
  // @ts-ignore
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};