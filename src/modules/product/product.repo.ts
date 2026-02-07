import { eq } from 'drizzle-orm';

import { db } from '@/shared/infrastructure/db/client';
import { Product, productSchema } from '@/shared/infrastructure/db/schema/product.schema';
import { IPagination } from '@/shared/types/pagination.type';

export interface IProductRepository {
  create(data: { name: string; price: number }): Promise<Product>;
  findAll(pagination?: IPagination): Promise<Product[]>;
  findById(id: string): Promise<Product>;
}

export class ProductRepo implements IProductRepository {
  public async create(data: { name: string; price: number }): Promise<Product> {
    return (await db.insert(productSchema).values(data).returning())[0];
  }

  public async findAll(pagination?: IPagination): Promise<Product[]> {
    return await db.query.productSchema.findMany({
      limit: pagination?.limit,
      offset: (pagination?.page || 1 - 1) * (pagination?.limit || 0),
    });
  }

  public async findById(id: string): Promise<Product> {
    return (await db.select().from(productSchema).where(eq(productSchema.id, id)))[0];
  }
}
