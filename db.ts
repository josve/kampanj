import { MongoClient } from 'mongodb';

let db;

export default async function connectToDatabase() {
  if (db) return db;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {});

  await client.connect();

  db = client.db(process.env.MONGODB_DATABASE);

  return db;
}
