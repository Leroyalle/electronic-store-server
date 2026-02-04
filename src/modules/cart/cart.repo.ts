import { eq } from 'drizzle-orm';

import { db } from '@/shared/db/client';
import { Cart, cartSchema, CartWithRelations } from '@/shared/db/schema/cart.schema';

export interface ICartRepository {
  create(userId: string): Promise<Cart>;
  findById(id: string): Promise<CartWithRelations | undefined>;
  update(cart: Partial<Omit<Cart, 'id'>>): Promise<Cart>;
}

export class CartRepository implements ICartRepository {
  public async findById(id: string): Promise<CartWithRelations | undefined> {
    return await db.query.cartSchema.findFirst({
      where: eq(cartSchema.id, id),
      with: {
        cartItems: true,
      },
    });
  }

  public async create(userId: string): Promise<Cart> {
    return (await db.insert(cartSchema).values({ userId }).returning())[0];
  }

  public async update(cart: Partial<Omit<Cart, 'id'>>): Promise<Cart> {
    return (await db.update(cartSchema).set(cart).returning())[0];
  }
}
