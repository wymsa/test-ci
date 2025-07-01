import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { TDatabaseConnection } from '../common/types/types';

export class DatabaseService {
  private databaseConnection: TDatabaseConnection;
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString: connectionString || '' });
  }

  public get database() {
    return this.databaseConnection;
  }

  async connect() {
    try {
      await this.pool?.query('SELECT 1');
      this.databaseConnection = drizzle({ client: this.pool });
      return this.databaseConnection;
    } catch (error: any) {
      throw new Error(`Database connection failed: ${error}`);
    }
  }
}
