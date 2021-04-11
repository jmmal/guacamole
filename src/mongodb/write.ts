import { InsertOneWriteOpResult, WithId } from "mongodb";
import { Activity } from "../common/types";
import { connectToDatabase } from "./connect";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_ACTIVITIES_COLLECTION = process.env.MONGODB_ACTIVITIES_COLLECTION;

const writeActivity = async (activity: Activity): Promise<InsertOneWriteOpResult<WithId<Activity>>> => {
  const db = await connectToDatabase(MONGODB_URI);

  return db.collection(MONGODB_ACTIVITIES_COLLECTION).insertOne(activity);
};

export {
  writeActivity
};