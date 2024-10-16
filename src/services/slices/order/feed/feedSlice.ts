import { createSlice } from '@reduxjs/toolkit';
import { TFeedState } from '../../types';
import { fetchFeed } from './thunk';

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedLoading: false,
  feedLoadingError: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsFeedLoading: (state) => state.isFeedLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isFeedLoading = true;
        state.feedLoadingError = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isFeedLoading = false;
        state.feedLoadingError = action.error.message ?? null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isFeedLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectIsFeedLoading
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
