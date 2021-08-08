import { ReplaceOptions, Document, UpdateResult } from 'mongodb';
import { Activity } from '../types';
import { connectToDatabase } from './connect';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_ACTIVITIES_COLLECTION = process.env.MONGODB_ACTIVITIES_COLLECTION;

const writeActivity = async (
  activity: Activity
): Promise<Document | UpdateResult> => {
  const db = await connectToDatabase(MONGODB_URI);

  const options: ReplaceOptions = {
    upsert: true,
  };

  const query = {
    objectKey: activity.objectKey,
  };

  return db
    .collection(MONGODB_ACTIVITIES_COLLECTION)
    .replaceOne(query, activity, options);
};

export { writeActivity };
