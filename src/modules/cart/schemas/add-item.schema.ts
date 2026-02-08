import z from 'zod';

export const addItemZodSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().min(1).optional().default(1),
});
