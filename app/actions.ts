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

export async function joinEvent(
  id: string,
  name: string,
  email: string,
  phone: string,
) {
  // find the event by id and add the participant to the participants array, create the array if it doesn't exist
  const db = await connectToDatabase();
  const collection = db.collection('events');

  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          participants: {
            name: name,
            email: email,
            phone: phone,
          },
        },
      },
      { returnOriginal: false },
    );

    return;
  } catch (error) {
    console.error('Failed to join event', error);
    return;
  }
}

// Update name, location and published properties
export async function updateEvent(
  id: string,
  name: string,
  location: string,
  published: boolean,
  date: Date,
  startTime: Date,
  endTime: Date,
  facebook: string,
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const db = await connectToDatabase();
  const collection = db.collection('events');

  try {
    // Find the document by id and update the properties
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name,
          location: location,
          published: published,
          date: date,
          startTime: startTime,
          endTime: endTime,
          facebook: facebook,
        },
      },
      { returnOriginal: false },
    );

    return;
  } catch (error) {
    console.error('Failed to update event', error);
    return;
  }
}
