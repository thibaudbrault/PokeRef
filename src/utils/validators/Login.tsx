import { z } from 'zod';

export const LoginValidator = z.object({
  email: z
    .string()
    .email({ message: `You need to enter your email address` })
    .nonempty(),
  password: z.string().nonempty({ message: `You need to enter your password` }),
});
