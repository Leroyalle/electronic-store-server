import { createAuthModule } from './modules/auth/auth.module';
import { createCartModule } from './modules/cart/cart.module';
import { createDataCounterModule } from './modules/data-counter/data-counter.module';
import { createOrderModule } from './modules/order/order.module';
import { createProductModule } from './modules/product/product.module';
import { createTelegramModule } from './modules/telegram/telegram.module';
import { createUserModule } from './modules/user/user.module';
import { db } from './shared/infrastructure/db/client';

export function createModules() {
  const telegram = createTelegramModule();

  const dataCounter = createDataCounterModule({ db });

  const user = createUserModule();

  const auth = createAuthModule({
    userCommands: user.commands,
    userQueries: user.queries,
  });
  const product = createProductModule();

  const cart = createCartModule({ productQueries: product.queries });

  const order = createOrderModule({
    cartQueries: cart.queries,
    userQueries: user.queries,
    notifierCommands: telegram.commands,
  });

  return {
    user,
    auth,
    product,
    cart,
    order,
    telegram,
  };
}
