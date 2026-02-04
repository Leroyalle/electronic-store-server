import { Cart } from '@/shared/db/schema/cart.schema';
import { Product } from '@/shared/db/schema/product.schema';

import { CartItemCommands } from './cart-item/cart-item.commands';
import { ICartRepository } from './cart.repo';

interface Deps {
  cartRepo: ICartRepository;
  cartItemCommands: CartItemCommands;
}

export class CardCommands {
  constructor(private readonly deps: Deps) {}

  public create(userId: string) {
    return this.deps.cartRepo.create(userId);
  }

  public update(cart: Partial<Omit<Cart, 'id'>>) {
    return this.deps.cartRepo.update(cart);
  }

  public async addItem(userId: string, product: Product) {
    let cart = await this.deps.cartRepo.findById(userId);

    if (!cart) {
      const createdCart = await this.create(userId);
      cart = await this.deps.cartRepo.findById(createdCart.id);
    }

    if (!cart) {
      throw new Error('Не удалось создать или найти корзину');
    }

    const findItem = cart.cartItems.find(item => item.productId === product.id);

    if (findItem) {
      await this.deps.cartItemCommands.update(findItem.id, { quantity: findItem.quantity + 1 });
    }

    await this.deps.cartItemCommands.create({
      cartId: cart.id,
      productId: product.id,
      quantity: 1,
    });

    return await this.deps.cartRepo.findById(userId);

    // return this.deps.cartItemCommands.create(item);
  }
}
