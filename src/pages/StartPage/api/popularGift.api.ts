import { api } from '@/app/store/api';

export type Gift = {
  id: number;
  name: string;
  eventId: number | null;
  description: string | null;
  imagePath: string | null;
  price: number | null;
  currency: 'USD' | 'BYN' | 'RUB' | null;
  externalLink: string | null;
  isReserved: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  id: number;
  title: string;
  userId: number;
  description?: string;
  eventDate?: string;
  imagePath?: string | null;
  createdAt: string;
  updatedAt: string;
  publicUrl: string | null;
  publicUrlExpiration: string | null;
  gifts: Gift[];
};

export type EventsResponse = Event[];
export type GiftsResponse = Gift[];

export const popularGiftApi = api.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query<GiftsResponse, void>({
      query: () => ({
        url: '/gifts/popular',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetQuery } = popularGiftApi;
