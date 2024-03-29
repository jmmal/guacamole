import { connectToDatabase } from './connect';
import { Activity } from '../types';
import { FindOptions, ObjectId } from 'mongodb';
import { everyNthElement } from '../utils';
import { ActivityTypeAggregation } from './types';

const MONGODB_URI = process.env.MONGODB_URI;

export const getActivities = async (
  page = 1,
  pageSize = 10,
  type: string
): Promise<Activity[]> => {
  const db = await connectToDatabase(MONGODB_URI);

  const options: FindOptions<Activity> = {
    sort: { startTime: -1 },
    limit: pageSize,
    skip: (page - 1) * pageSize,
    projection: {
      streamData: 0,
      polyline: 0,
      points: 0,
    },
  };

  const query = type ? { type } : {};

  const cursor = await db
    .collection<Activity>('activities_v2')
    .find(query, options);

  return cursor.toArray();
};

export const getCount = async (): Promise<number> => {
  const db = await connectToDatabase(MONGODB_URI);

  return db.collection<Activity>('activities_v2').countDocuments();
};

export const getById = async (id: string): Promise<Activity> => {
  const db = await connectToDatabase(MONGODB_URI);

  const query = {
    _id: new ObjectId(id),
  };

  const options: FindOptions<Activity> = {
    projection: {
      simplePolyline: 0,
      points: 0,
    },
  };

  const activity = await db
    .collection<Activity>('activities_v2')
    .findOne(query, options);
  activity.streamData = everyNthElement(activity.streamData, 4);

  return activity;
};

export const getActivityTypeAggregations = async (): Promise<
  ActivityTypeAggregation[]
> => {
  const db = await connectToDatabase(MONGODB_URI);

  const pipeline = [
    {
      $group: {
        _id: '$type',
        total: {
          $sum: 1,
        },
      },
    },
    {
      $addFields: {
        type: '$_id',
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];

  const cursor = await db
    .collection<Activity>('activities_v2')
    .aggregate<ActivityTypeAggregation>(pipeline);
  return cursor.toArray();
};

export const getLightweightActivities = async (): Promise<
  Partial<Activity>[]
> => {
  const db = await connectToDatabase(MONGODB_URI);

  const options: FindOptions<Activity> = {
    sort: { startTime: -1 },
    projection: {
      distance: 1,
      type: 1,
      startTime: 1,
      calories: 1,
      duration: 1,
      pace: 1,
    },
  };

  const query = {
    startTime: { $gt: new Date(2020) },
  };

  const cursor = await db
    .collection<Activity>('activities_v2')
    .find(query, options);

  return cursor.toArray();
};
