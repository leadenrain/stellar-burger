import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../../utils/burger-api';

export const getOrderList = createAsyncThunk(
  'order/getHistory',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getOrdersApi();
      return ingredients;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);

export const getOrder = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const order = await getOrderByNumberApi(orderNumber);
      return order;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);

export const postOrder = createAsyncThunk(
  'order/post',
  async (orderData: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(orderData);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);
