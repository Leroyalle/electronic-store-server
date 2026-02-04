import { Hono, MiddlewareHandler } from 'hono';

import { AuthVars } from '@/shared/types/auth-variables.type';

import { CardCommands } from './cart.commands';
import { CartQueries } from './cart.queries';

interface Deps {
  commands: CardCommands;
  queries: CartQueries;
  accessAuthMiddleware: MiddlewareHandler<{ Variables: AuthVars }>;
}

export function createCartRouter(deps: Deps): Hono {
  const router = new Hono();

  router.get('/', deps.accessAuthMiddleware, async c => {
    const userId = c.get('userId');
    const data = await deps.queries.findById(userId);
    return c.json(data);
  });

  router.post('/items', deps.accessAuthMiddleware, async c => {
    const userId = c.get('userId');
    const body = await c.req.json<{ productId: string }>();
    const data = await deps.commands.addItem(userId, body.productId);
    return c.json(data);
  });

  return router;
}
