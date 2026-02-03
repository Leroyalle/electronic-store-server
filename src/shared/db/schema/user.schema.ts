import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  phone: integer().notNull(),
});

export type User = InferSelectModel<typeof userSchema>;
