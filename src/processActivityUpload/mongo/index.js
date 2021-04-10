const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_ACTIVITIES_COLLECTION = process.env.MONGODB_ACTIVITIES_COLLECTION;
const DB_NAME = process.env.DB_NAME;

let cachedDb = null;

function connectToDatabase (uri) {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
      cachedDb = client.db(DB_NAME);
      return cachedDb;
    });
}

exports.writeActivity = async (activity) => {
  const db = await connectToDatabase(MONGODB_URI);

  return db.collection(MONGODB_ACTIVITIES_COLLECTION).insertOne(activity);
}