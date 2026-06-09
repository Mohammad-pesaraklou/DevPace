import mongoose from "mongoose";

const DB_URL = process.env.DB_URL!;

if (!DB_URL) {
  throw new Error("DB_URL is missing");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export default async function connectToDb() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    mongoose.set("strictQuery", true);

    cached!.promise = mongoose.connect(DB_URL).then((mongoose) => mongoose);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
