import { api } from '@/app/store/api';
import { Currency } from '@/shared/entities/entities';

type UserResponse = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  currency: Currency;
};
export type UserSettings = {
  id: number;
  email: string;
  name: string;
  currency: Currency;
};

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),
    getUserSettings: builder.query<UserSettings, void>({
      query: () => ({
        url: '/users/settings',
        method: 'GET',
      }),
    }),
    updateUserSettings: builder.mutation<
      UserSettings,
      Partial<UserSettings> & { password?: string; repeatPassword?: string }
    >({
      query: (data) => ({
        url: '/users/settings',
        method: 'PUT',
        body: {
          email: data.email,
          name: data.name,
          currency: data.currency,
          password: data.password,
        },
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useGetUserSettingsQuery, useUpdateUserSettingsMutation } =
  userApi;

export const {
  endpoints: { getCurrentUser },
} = userApi;
