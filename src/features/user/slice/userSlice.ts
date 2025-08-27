import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency, User, Gift } from '@/shared/entities/entities';
import { userApi } from '../api/user.api';
import { registerApi } from '@/features/register/api/register.api';
import { loginApi } from '@/features/login/api/login.api';

export type UserAccauntInfo = {
  name: string;
  email: string;
  currency: Currency;
  password: string;
};

const initialState: User = {
  id: 0,
  email: '',
  name: '',
  password: '',
  currency: Currency.USD,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAccauntInfo: (state, action: PayloadAction<UserAccauntInfo>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.currency = action.payload.currency;
      state.password = action.payload.password;
    },
    setCredentials: (state, action: PayloadAction<Partial<User>>) => {
      state.id = action.payload.id ?? state.id;
      state.email = action.payload.email ?? state.email;
      state.name = action.payload.name ?? state.name;
      state.currency = action.payload.currency ?? state.currency;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.currency = action.payload.currency;
      })
      .addMatcher(
        userApi.endpoints.getUserSettings.matchFulfilled,
        (
          state,
          action: {
            payload: { id: number; email: string; name: string; currency: Currency };
          },
        ) => {
          state.id = action.payload.id;
          state.email = action.payload.email;
          state.name = action.payload.name;
          state.currency = action.payload.currency;
        },
      )
      .addMatcher(
        userApi.endpoints.updateUserSettings.matchFulfilled,
        (
          state,
          action: {
            payload: { id: number; email: string; name: string; currency: Currency };
          },
        ) => {
          state.id = action.payload.id;
          state.email = action.payload.email;
          state.name = action.payload.name ?? null;
          state.currency = action.payload.currency ?? null;
        },
      )
      .addMatcher(registerApi.endpoints.register.matchFulfilled, (state, action) => {
        state.email = action.payload.user?.email;
        state.name = action.payload.user?.name;
      })
      .addMatcher(loginApi.endpoints.login.matchFulfilled, (state, action) => {
        state.email = action.payload.user?.email;
        state.name = action.payload.user?.name;
      });
  },
});

export const { resetAccauntInfo, setCredentials } = userSlice.actions;
export default userSlice.reducer;
