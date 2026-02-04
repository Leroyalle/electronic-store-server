import { db } from '@/shared/db/client';
import { Order, orderSchema } from '@/shared/db/schema/order.schema';

export interface IOrderRepository {
  create(data: Omit<Order, 'id'>): Promise<Order>;
  findAll(): Promise<Order[]>;
}

export class OrderRepo implements IOrderRepository {
  public async create(data: Omit<Order, 'id'>): Promise<Order> {
    return (await db.insert(orderSchema).values(data).returning())[0];
  }

  public async findAll(): Promise<Order[]> {
    return await db.query.orderSchema.findMany();
  }
}
