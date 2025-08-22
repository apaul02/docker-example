import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const globalForDb = globalThis as unknown as { pool?: Pool; db?: ReturnType<typeof drizzle> };

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

export const db = globalForDb.db ?? drizzle(pool);

// Cache in dev to avoid creating new pools on HMR
if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
  globalForDb.db = db;
}

