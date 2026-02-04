import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { CartCommands } from '../cart/cart.commands';
import { CartQueries } from '../cart/cart.queries';

import { OrderCommands } from './order.commands';
import { OrderQueries } from './order.queries';
import { OrderRepo } from './order.repo';

interface Deps {
  cartCommands: CartCommands;
  cartQueries: CartQueries;
}

export function createOrderModule(deps: Deps): CreateModuleResult<OrderCommands, OrderQueries> {
  const repository = new OrderRepo();
  const queries = new OrderQueries({ orderRepo: repository });
  const commands = new OrderCommands({
    orderRepo: repository,
    cartCommands: deps.cartCommands,
    cartQueries: deps.cartQueries,
  });

  return { commands, queries };
}
