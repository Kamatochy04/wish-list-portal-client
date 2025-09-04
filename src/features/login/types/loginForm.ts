import { z } from 'zod';
import { loginSchema } from '../schema/loginSchema';

export type IRegisterForm = z.infer<typeof loginSchema>;

export const defaultFormValues: IRegisterForm = {
  email: '',
  password: '',
  terms: false,
};
