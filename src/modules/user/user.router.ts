import { Hono } from 'hono';

import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';

export function createUserRouter(commands: UserCommands, queries: UserQueries): Hono {
  const userRouter = new Hono();

  userRouter.get('/:id', c => {
    const id = c.req.param('id');
    const data = queries.findById(id);
    return c.json(data);
  });

  return userRouter;
}
