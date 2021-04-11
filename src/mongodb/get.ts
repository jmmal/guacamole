import { connectToDatabase } from './connect';
import { Activity } from '../common/types';
import { FindOneOptions } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

const getActivities = async (page = 1, pageSize = 10): Promise<Activity[]> => {
  const db = await connectToDatabase(MONGODB_URI);

  const options: FindOneOptions<Activity> = {
    sort: { startTime: -1 },
    limit: pageSize,
    skip: (page - 1) * pageSize,
    projection: {
      streamData: 0,
      polyline: 0,
      points: 0
    }
  };

  const cursor = await db.collection<Activity>('activities_v2').find({}, options);

  return cursor.toArray();
};

export {
  getActivities
};