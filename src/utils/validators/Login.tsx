import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.string().nonempty('You need to enter your email adress'),
  password: z.string().nonempty('You need to enter your password'),
});
