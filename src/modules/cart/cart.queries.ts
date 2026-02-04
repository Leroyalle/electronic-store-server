import { ICartRepository } from './cart.repo';

interface Deps {
  cartRepo: ICartRepository;
}

export class CartQueries {
  constructor(private readonly deps: Deps) {}

  public findById(id: string) {
    return this.deps.cartRepo.findById(id);
  }
}
