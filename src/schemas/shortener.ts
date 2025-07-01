import { sql } from 'drizzle-orm';
import { integer, pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// shortener
export const shortenerTable = pgTable('shortener', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shortToken: varchar('short_token', { length: 255 }).notNull(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull()
});

export type TShortenerSelect = typeof shortenerTable.$inferSelect;
export type TShortenerInsert = typeof shortenerTable.$inferInsert;
