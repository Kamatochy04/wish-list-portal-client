import { api } from '@/app/store/api';

export type Gift = {
  id: number;
  name: string;
  eventId?: number;
  eventTitle?: string | null;
  description?: string;
  imagePath?: string | null;
  price?: number;
  currency?: 'USD' | 'BYN' | 'RUB';
  externalLink?: string;
};

export type GiftsResponse = Gift[];

export const giftApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserGifts: builder.query<GiftsResponse, void>({
      query: () => ({
        url: '/gifts/user',
        method: 'GET',
      }),
    }),
    getById: builder.query<Gift, number>({
      query: (id) => ({
        url: `/gifts/${id}`,
        method: 'GET',
      }),
    }),
    createGift: builder.mutation<Gift, FormData>({
      query: (formData) => ({
        url: '/gifts',
        method: 'POST',
        body: formData,
      }),
    }),
    update: builder.mutation<Gift, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/gifts/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    delete: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/gifts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserGiftsQuery,
  useGetByIdQuery,
  useCreateGiftMutation,
  useUpdateMutation,
  useDeleteMutation,
} = giftApi;
