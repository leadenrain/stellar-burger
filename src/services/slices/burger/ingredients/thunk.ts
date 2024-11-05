import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/get',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);
