import { api } from '@/app/store/api';
import { UserData } from '@/shared/entities/user';

type ResponseRegisterData = {
  user: {
    id: number;
    email: string;
    name: string;
  };
  token: string;
};

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResponseRegisterData, UserData>({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;

export const {
  endpoints: { register },
} = registerApi;
