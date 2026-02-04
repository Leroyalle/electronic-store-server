import { Hono } from 'hono';

import { createMiddlewares } from './middlewares';
import { createModules } from './modules';
import { createAuthRouter } from './modules/auth/auth.router';
import { createCartRouter } from './modules/cart/cart.router';
import { createOrderRouter } from './modules/order/order.router';
import { createProductRouter } from './modules/product/product.router';
import { createUserRouter } from './modules/user/user.router';

const app = new Hono();

app.onError((err, c) => {
  return c.json({ message: err.message }, 404);
});

const { auth, cart, order, product, user } = createModules();
const { accessAuth } = createMiddlewares({ verifyToken: auth.commands.verifyToken });

const userRouter = createUserRouter({
  commands: user.commands,
  queries: user.queries,
  accessAuthMiddleware: accessAuth,
});

const authRouter = createAuthRouter({ commands: auth.commands });

const productRouter = createProductRouter({
  commands: product.commands,
  queries: product.queries,
});

const cartRouter = createCartRouter({
  commands: cart.commands,
  queries: cart.queries,
  accessAuthMiddleware: accessAuth,
});

const orderRouter = createOrderRouter({
  queries: order.queries,
  commands: order.commands,
  accessAuthMiddleware: accessAuth,
});

app.route('/user', userRouter);
app.route('/auth', authRouter);
app.route('/product', productRouter);
app.route('/cart', cartRouter);
app.route('/order', orderRouter);

app.get('/', c => {
  return c.text('Hello Hono!');
});

export default app;
