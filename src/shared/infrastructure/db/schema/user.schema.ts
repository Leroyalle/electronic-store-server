import { InferSelectModel, relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { accountSchema } from './account.schema';
import { cartSchema } from './cart.schema';
import { orderSchema } from './order.schema';
import { refreshTokenSchema } from './refresh-token.schema';
import { pgTimestamp } from './timestamp';

export const roles = ['user', 'admin'] as const;
export const roleEnum = pgEnum('role', roles);

export const userSchema = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  // email: text().notNull().unique(),
  // password: text().notNull(),
  // isVerified: boolean().notNull().default(false),
  // role: roleEnum().notNull(),
  ...pgTimestamp,
});

export const userRelation = relations(userSchema, ({ many, one }) => ({
  accounts: many(accountSchema),
  cart: one(cartSchema),
  orders: many(orderSchema),
}));

export type User = InferSelectModel<typeof userSchema>;
export type RoleEnum = (typeof roles)[number];
