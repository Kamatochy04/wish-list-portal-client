import { api } from '@/app/store/api';

type Gift = {
  id: number;
  name: string;
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

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query<EventsResponse, void>({
      query: () => ({
        url: '/events',
        method: 'GET',
      }),
    }),
    getById: builder.query<Event, number>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'GET',
      }),
    }),
    createEvent: builder.mutation<Event, FormData>({
      query: (formData) => ({
        url: '/events',
        method: 'POST',
        body: formData,
      }),
    }),
    update: builder.mutation<Event, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    delete: builder.mutation<void, number>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetQuery,
  useGetByIdQuery,
  useCreateEventMutation,
  useUpdateMutation,
  useDeleteMutation,
} = eventApi;
