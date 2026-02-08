import z from 'zod';

export const paramsZodSchema = z.object({ id: z.uuid().min(1) });
