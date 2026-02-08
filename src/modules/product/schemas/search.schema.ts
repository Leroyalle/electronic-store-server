import z from 'zod';

export const searchProductZodSchema = z.object({
  query: z.string().min(1),
});
