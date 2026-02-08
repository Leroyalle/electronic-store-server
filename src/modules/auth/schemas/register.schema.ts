import z from 'zod';

import { loginZodSchema } from './login.schema';

export const registerZodSchema = loginZodSchema.extend({
  name: z.string().max(30),
});
