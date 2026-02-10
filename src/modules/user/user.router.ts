import { zValidator } from '@hono/zod-validator';
import { Hono, MiddlewareHandler } from 'hono';

import { paramsZodSchema } from '@/shared/infrastructure/zod/params.schema';
import { AuthVars } from '@/shared/types/auth-variables.type';

import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';

type CreateUserRouterDeps = {
  commands: UserCommands;
  queries: UserQueries;
  accessAuthMiddleware: MiddlewareHandler<{
    Variables: AuthVars;
  }>;
};

export function createUserRouter(deps: CreateUserRouterDeps): Hono {
  const userRouter = new Hono();

  userRouter.get('/me', deps.accessAuthMiddleware, async c => {
    const id = c.get('userId');
    const data = await deps.queries.findById(id);
    return c.json(data);
  });

  userRouter.get('/:id', zValidator('param', paramsZodSchema), async c => {
    const params = c.req.valid('param');
    const data = await deps.queries.findById(params.id);
    return c.json(data);
  });

  return userRouter;
}
