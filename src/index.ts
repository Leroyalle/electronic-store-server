import { Hono } from 'hono';

import { createUserModule } from './modules/user/user.module';

const app = new Hono();

const userModule = createUserModule();
app.route('/user', userModule.router);

app.get('/', c => {
  return c.text('Hello Hono!');
});

export default app;
