import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const productSchema = pgTable('products', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  price: integer().notNull(),
});

export type Product = InferSelectModel<typeof productSchema>;
