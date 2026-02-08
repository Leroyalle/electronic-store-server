import { Index } from 'meilisearch';

import { Product } from '@/shared/infrastructure/db/schema/product.schema';

import { IProductRepository } from './product.repo';

interface Deps {
  productRepo: IProductRepository;
  searchIndex: Index<Pick<Product, 'id' | 'name' | 'price'>>;
}

export class ProductCommands {
  constructor(private readonly deps: Deps) {}

  public async create(data: { name: string; price: number }) {
    const product = await this.deps.productRepo.create(data);
    await this.deps.searchIndex.addDocuments([product]);
    return product;
  }
}
