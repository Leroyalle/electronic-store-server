import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import { getEnv } from '@/shared/lib/helpers/get-env.helper';

export default defineConfig({
  out: './drizzle',
  schema: './src/shared/db/schema/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: getEnv('DATABASE_URL'),
  },
});
