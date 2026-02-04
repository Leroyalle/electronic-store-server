import { Order } from '@/shared/db/schema/order.schema';

import { IOrderRepository } from './order.repo';

interface Deps {
  orderRepo: IOrderRepository;
}

export class OrderCommands {
  constructor(private readonly deps: Deps) {}

  public create(data: Omit<Order, 'id'>) {
    return this.deps.orderRepo.create(data);
  }
}
