import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gift, giftApi, GiftsResponse } from './api/gift.api';

interface GiftState {
  gifts: GiftsResponse;
  currentGift: Gift | null;
}

const initialState: GiftState = {
  gifts: [],
  currentGift: null,
};

const giftSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {
    clearCurrentGift: (state) => {
      state.currentGift = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        giftApi.endpoints.getUserGifts.matchFulfilled,
        (state, action: PayloadAction<GiftsResponse>) => {
          state.gifts = action.payload;
        },
      )
      .addMatcher(
        giftApi.endpoints.getById.matchFulfilled,
        (state, action: PayloadAction<Gift>) => {
          state.currentGift = action.payload;
        },
      )
      .addMatcher(
        giftApi.endpoints.createGift.matchFulfilled,
        (state, action: PayloadAction<Gift>) => {
          state.gifts.push(action.payload);
        },
      )
      .addMatcher(giftApi.endpoints.update.matchFulfilled, (state, action: PayloadAction<Gift>) => {
        const index = state.gifts.findIndex((gift) => gift.id === action.payload.id);
        if (index !== -1) {
          state.gifts[index] = action.payload;
        }
        if (state.currentGift?.id === action.payload.id) {
          state.currentGift = action.payload;
        }
      })
      .addMatcher(
        giftApi.endpoints.delete.matchFulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.gifts = state.gifts.filter((gift) => gift.id !== action.payload.id);

          if (state.currentGift?.id === action.payload.id) {
            state.currentGift = null;
          }
        },
      );
  },
});

export const { clearCurrentGift } = giftSlice.actions;
export default giftSlice.reducer;
