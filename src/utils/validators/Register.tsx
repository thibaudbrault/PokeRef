import { z } from 'zod';

export const RegisterValidator = z
  .object({
    name: z
      .string()
      .min(3, { message: `Name must be at least 3 characters long` }),
    email: z
      .string()
      .email({ message: `You need to enter a valid email` })
      .min(1, { message: `You need to enter an email` }),
    password: z
      .string()
      .min(6, { message: `Your password must be at least 6 characters long` }),
    confirmPassword: z
      .string()
      .nonempty({ message: `You need to confirm your password` }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: [`confirmPassword`],
    message: `Passwords must match`,
  });
