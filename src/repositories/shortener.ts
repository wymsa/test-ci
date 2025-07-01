import { eq } from 'drizzle-orm';
import { TDatabaseConnection } from '../common/types/types';
import { shortenerTable, TShortenerInsert, TShortenerSelect } from '../schemas/shortener';

export interface IShortenerRepository {
  create: (obj: { shortToken: string; originalUrl: string }) => Promise<TShortenerInsert>;

  getOne: (shortToken: string) => Promise<TShortenerSelect | null>;

  getAll: (options: { limit: number; skip: number }) => Promise<TShortenerSelect[] | null>;

  delete: () => unknown;

  update: () => unknown;
}

export class ShortenerRepository implements IShortenerRepository {
  constructor(private readonly database: TDatabaseConnection) {}

  async create(obj: { shortToken: string; originalUrl: string }) {
    const [createdItem] = await this.database
      .insert(shortenerTable)
      .values({ shortToken: obj.shortToken, originalUrl: obj.originalUrl })
      .returning();

    return createdItem;
  }

  async getOne(shortToken: string) {
    const [foundItem] = await this.database
      .select()
      .from(shortenerTable)
      .where(eq(shortenerTable.shortToken, shortToken))
      .limit(1);

    return foundItem;
  }

  async getAll(options: { limit: number; skip: number }) {
    const foundItems = await this.database
      .select()
      .from(shortenerTable)
      .limit(options.limit)
      .offset(options.skip);

    return foundItems;
  }

  delete() {
    throw new Error('Method not implemented');
  }
  update() {
    throw new Error('Method not implemented');
  }
}
