import { z } from 'zod';
import { registerSchema } from '../schema/registerSchema';

export type IRegisterForm = z.infer<typeof registerSchema>;

export const defaultFormValues: IRegisterForm = {
  name: '',
  email: '',
  password: '',
  repeat_password: '',
  terms: false,
};
