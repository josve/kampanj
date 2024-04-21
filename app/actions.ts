'use server';
import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';
import connectToDatabase from '../db';
import { ObjectId } from 'mongodb';

export async function updateDescription(markdown: string, id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const db = await connectToDatabase();
  const collection = db.collection('events');

  try {
    // Find the document by id and update the description property
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { description: markdown } },
      { returnOriginal: false },
    );

    return;
  } catch (error) {
    console.error('Failed to update event', error);
    return;
  }
}

export async function updateInstruction(markdown: string, id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const db = await connectToDatabase();
  const collection = db.collection('events');

  try {
    // Find the document by id and update the description property
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { instruction: markdown } },
      { returnOriginal: false },
    );

    return;
  } catch (error) {
    console.error('Failed to update event', error);
    return;
  }
}
