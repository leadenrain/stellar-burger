import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../../utils/burger-api';

export const getOrderList = createAsyncThunk('order/getHistory', getOrdersApi);

export const getOrder = createAsyncThunk(
  'order/getByNumber',
  async (data: number) => await getOrderByNumberApi(data)
);

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => await orderBurgerApi(data)
);
