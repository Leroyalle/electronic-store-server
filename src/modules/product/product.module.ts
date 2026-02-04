import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { ProductCommands } from './product.commands';
import { ProductQueries } from './product.queries';
import { ProductRepo } from './product.repo';

export function createProductModule(): CreateModuleResult<ProductCommands, ProductQueries> {
  const productRepo = new ProductRepo();
  const commands = new ProductCommands({ productRepo });
  const queries = new ProductQueries({ productRepo });
  return { commands, queries };
}
