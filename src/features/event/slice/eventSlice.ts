import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { eventApi, Event, EventsResponse } from '../api/event.api';

interface EventState {
  events: EventsResponse;
  currentEvent: Event | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        eventApi.endpoints.get.matchFulfilled,
        (state, action: PayloadAction<EventsResponse>) => {
          state.events = action.payload;
        },
      )
      .addMatcher(
        eventApi.endpoints.getById.matchFulfilled,
        (state, action: PayloadAction<Event>) => {
          state.currentEvent = action.payload;
        },
      )
      .addMatcher(
        eventApi.endpoints.createEvent.matchFulfilled,
        (state, action: PayloadAction<Event>) => {
          state.events.push(action.payload);
        },
      )
      .addMatcher(
        eventApi.endpoints.update.matchFulfilled,
        (state, action: PayloadAction<Event>) => {
          const index = state.events.findIndex((event) => event.id === action.payload.id);
          if (index !== -1) {
            state.events[index] = action.payload;
          }
          if (state.currentEvent?.id === action.payload.id) {
            state.currentEvent = action.payload;
          }
        },
      );
  },
});

export const { clearCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;
