import { MongoClient, Db } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_ACTIVITIES_COLLECTION = process.env.MONGODB_ACTIVITIES_COLLECTION;
const DB_NAME = process.env.DB_NAME;

let cachedDb: Db = null;

function connectToDatabase (uri: string) {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
      cachedDb = client.db(DB_NAME);
      return cachedDb;
    });
}

const writeActivity = async (activity: unknown) => {
  const db = await connectToDatabase(MONGODB_URI);

  return db.collection(MONGODB_ACTIVITIES_COLLECTION).insertOne(activity);
}

export {
  writeActivity
};