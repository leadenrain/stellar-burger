import { createSlice } from '@reduxjs/toolkit';
import { TUserState } from '../types';
import {
  getUser,
  registerUser,
  updateUser,
  loginUser,
  logoutUser
} from './thunk';
import { handleFullfilled, handlePending, handleReject } from './handlers';

const initialState: TUserState = {
  userData: {
    name: '',
    email: ''
  },
  isAuthLoading: false,
  authError: null
};

const userSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.userData,
    selectIsAuthorized: (state) => state.userData?.email,
    selectIsLoading: (state) => state.isAuthLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.rejected, handleReject)
      .addCase(getUser.fulfilled, handleFullfilled);
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleReject)
      .addCase(registerUser.fulfilled, handleFullfilled);
    builder
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.rejected, handleReject)
      .addCase(updateUser.fulfilled, handleFullfilled);
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleReject)
      .addCase(loginUser.fulfilled, handleFullfilled);
    builder
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.rejected, handleReject)
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.authError = null;
        state.userData = null;
      });
  }
});

export const { selectUser, selectIsAuthorized, selectIsLoading } =
  userSlice.selectors;
export const authReducer = userSlice.reducer;
