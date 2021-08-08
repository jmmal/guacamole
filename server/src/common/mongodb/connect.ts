import { MongoClient, Db } from 'mongodb';

const DB_NAME = process.env.DB_NAME;
let cachedDb: Db = null;

export function connectToDatabase(uri: string): Promise<Db> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(uri).then((client) => {
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  });
}
