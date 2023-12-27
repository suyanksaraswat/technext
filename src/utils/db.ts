import { createConnection } from 'mysql2/promise';

export async function connect() {
  const DB_URL = process.env.DATABASE_URL;
  if (!DB_URL) {
    throw new Error('DB not found!');
  }

  const connection = await createConnection(DB_URL);
  return connection;
}
