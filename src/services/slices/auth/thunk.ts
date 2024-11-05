import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUserLogin } from '../types';
import {
  getUserApi,
  TRegisterData,
  registerUserApi,
  updateUserApi,
  loginUserApi,
  logoutApi
} from '../../../utils/burger-api';
import { setCookie, deleteCookie } from '../../../utils/cookie';

// как типизировать санку, чтобы в пейлоад можно было положить ошибку, осталось загадкой

export const getUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(userData);
      return data.user;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TUserLogin, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(userData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Неизвестная ошибка'
      });
    }
  }
);
