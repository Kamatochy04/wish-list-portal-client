import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    repeat_password: z.string(),
    terms: z.boolean().refine((val) => val, {
      message: 'You must accept the terms of service',
    }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ['repeat_password'],
  });
