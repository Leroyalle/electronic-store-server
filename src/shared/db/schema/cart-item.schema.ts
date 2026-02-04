import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

import { cartSchema } from './cart.schema';
import { productSchema } from './product.schema';

export const cartItemSchema = pgTable('cartItems', {
  id: uuid().defaultRandom().primaryKey(),
  productId: uuid()
    .notNull()
    .references(() => productSchema.id, { onDelete: 'cascade' }),
  cartId: uuid()
    .notNull()
    .references(() => cartSchema.id, { onDelete: 'cascade' }),
});

export const cartItemRelations = relations(cartItemSchema, ({ one }) => ({
  cart: one(cartSchema, {
    fields: [cartItemSchema.cartId],
    references: [cartSchema.id],
  }),
}));

export type CartItem = InferSelectModel<typeof cartItemSchema>;
