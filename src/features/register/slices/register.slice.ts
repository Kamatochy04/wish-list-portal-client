import { createSlice } from '@reduxjs/toolkit';
import { registerApi } from '../api/register.api';
import { UserData } from '@/shared/entities/user';

type InitialState = {
  user: UserData | null;
  isAuthenticated: boolean;
};

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(registerApi.endpoints.register.matchFulfilled, (state, action) => {
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

// export const selectUser = (state: RootState) => state.auth.user;
