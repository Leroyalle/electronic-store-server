import { Hono } from 'hono';

import { UserCommands } from './user.commands';

export function createUserRouter(commands: UserCommands): Hono {
  const userRouter = new Hono();

  userRouter.get('/:id', c => {
    const id = c.req.param('id');
    const data = commands.findById(id);
    return c.json(data);
  });

  return userRouter;
}
