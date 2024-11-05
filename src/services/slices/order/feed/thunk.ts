import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../../utils/burger-api';

export const fetchFeed = createAsyncThunk(
  'feed/get',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getFeedsApi();
      return ingredients;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);
