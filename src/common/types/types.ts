import { drizzle } from 'drizzle-orm/node-postgres';

export type TDatabaseConnection = ReturnType<typeof drizzle>;
