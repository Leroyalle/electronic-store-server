import { drizzle } from 'drizzle-orm/node-postgres';

import * as cartItemSchema from './schema/cart-item.schema';
import * as cartSchema from './schema/cart.schema';
import * as orderSchema from './schema/order.schema';
import * as productSchema from './schema/product.schema';
import * as refreshTokenSchema from './schema/refresh-token.schema';
import * as userSchema from './schema/user.schema';

function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const db = drizzle(getEnv(process.env.DATABASE_URL!), {
  schema: {
    ...cartSchema,
    ...cartItemSchema,
    ...productSchema,
    ...userSchema,
    ...orderSchema,
    ...refreshTokenSchema,
  },
});
