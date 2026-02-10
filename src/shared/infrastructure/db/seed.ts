import { createModules } from '@/modules';

import { db } from './client';
import { productSchema } from './schema/product.schema';

const { product, meilisearch } = createModules();

async function clear() {
  console.log('Clearing...');
  await db.delete(productSchema);
  await meilisearch.indexes.productIndex.deleteAllDocuments().waitTask();
}

async function seed() {
  console.log('Seeding data...');

  for (let i = 0; i < 10; i++) {
    await product.commands.create({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100),
    });
  }
}

async function main() {
  try {
    await clear();
    await seed();
    console.log('Done!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
