import { IProductRepository } from './product.repo';

interface Deps {
  productRepo: IProductRepository;
}

export class ProductCommands {
  constructor(private readonly deps: Deps) {}

  public create(data: { name: string; price: number }) {
    return this.deps.productRepo.create(data);
  }
}
