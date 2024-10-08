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

export const getUser = createAsyncThunk(
  'user/get',
  async () => (await getUserApi()).user
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: TRegisterData) => (await updateUserApi(userData)).user
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TUserLogin) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});
