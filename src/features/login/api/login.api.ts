import { api } from '@/app/store/api';

export type UserData = {
  email: string;
  password: string;
};

type ResponseRegisterData = {
  user: {
    id: number;
    email: string;
    name: string;
  };
  token: string;
};

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseRegisterData, UserData>({
      query: (userData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;

export const {
  endpoints: { login },
} = loginApi;
