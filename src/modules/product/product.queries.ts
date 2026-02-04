import { IProductRepository } from './product.repo';

interface Deps {
  productRepo: IProductRepository;
}

export class ProductQueries {
  constructor(private readonly deps: Deps) {}

  public findAll() {
    return this.deps.productRepo.findAll();
  }

  public findById(id: string) {
    return this.deps.productRepo.findById(id);
  }
}
