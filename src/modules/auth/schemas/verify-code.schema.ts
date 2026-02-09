import z from 'zod';

export const verifyEmailCodeZodSchema = z.object({
  code: z.coerce.number().min(4).max(4),
  email: z.email(),
});

export const verifyPasswordCodeZodSchema = verifyEmailCodeZodSchema.extend({
  newPassword: z.string().min(6).max(20),
});
