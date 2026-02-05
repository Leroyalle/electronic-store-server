import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { CartQueries } from '../cart/cart.queries';
import { TelegramCommands } from '../telegram/telegram.commands';
import { UserQueries } from '../user/user.queries';

import { OrderCommands } from './order.commands';
import { OrderQueries } from './order.queries';
import { OrderRepo } from './order.repo';

interface Deps {
  cartQueries: CartQueries;
  notifierCommands: TelegramCommands;
  userQueries: UserQueries;
}

export function createOrderModule(deps: Deps): CreateModuleResult<OrderCommands, OrderQueries> {
  const repository = new OrderRepo();
  const queries = new OrderQueries({ orderRepo: repository });
  const commands = new OrderCommands({
    orderRepo: repository,
    cartQueries: deps.cartQueries,
    notifierCommands: deps.notifierCommands,
    userQueries: deps.userQueries,
  });

  return { commands, queries };
}
