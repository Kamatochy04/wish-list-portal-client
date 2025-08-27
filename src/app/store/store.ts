import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api } from './api';
import { listenerMiddleware } from '../middleware/auth';
import userReducer from '@/features/user/slice/userSlice';
import giftReducer from '@/features/gift/gift.slice';
import eventReducer from '@/features/event/slice/eventSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    gifts: giftReducer,
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
