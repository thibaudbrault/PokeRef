import { z } from 'zod';

export const LoginValidator = z.object({
  email: z
    .string()
    .email({ message: `Invalid email` })
    .min(1, { message: `You need to enter your email` }),
  password: z.string().min(6, { message: `You need to enter your password` }),
});
