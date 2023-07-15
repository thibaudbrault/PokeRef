import { z } from 'zod';

export const RegisterValidator = z
  .object({
    name: z
      .string()
      .min(3, { message: `Name must be at least 3 characters long` })
      .nonempty(`A name is required`),
    email: z.string().email().nonempty(`An email is required`),
    password: z
      .string()
      .min(6, { message: `Your password must be at least 6 characters long` })
      .nonempty(`A password is required`),
    confirmPassword: z.string().nonempty(`You need to confirm your password`),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: [`confirmPassword`],
    message: `Passwords must match`,
  });
