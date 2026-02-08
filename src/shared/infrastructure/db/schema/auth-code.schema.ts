import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';

import { pgTimestamp } from './timestamp';
import { userSchema } from './user.schema';

const codeType = ['verify_email', 'reset_password'] as const;
const codeTypeEnum = pgEnum('code_type', codeType);

export const authCodeSchema = pgTable('auth_codes', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
  code: integer().notNull(),
  type: codeTypeEnum().notNull(),
  ...pgTimestamp,
});

export const authCodeRelations = relations(authCodeSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [authCodeSchema.userId],
    references: [userSchema.id],
  }),
}));

export type AuthCode = InferSelectModel<typeof authCodeSchema>;
