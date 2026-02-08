import z from 'zod';

export const paramsZodSchema = z.uuid().min(1);
