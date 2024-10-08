import { createSlice } from '@reduxjs/toolkit';
import { TOrderState } from '../../types';
import { getOrder, getOrderList, postOrder } from './thunk';
import { handlePending, handleReject } from './handlers';

const initialState: TOrderState = {
  orderList: [],
  selectedOrder: null,
  newOrder: null,
  isOrderLoading: false,
  orderError: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  selectors: {
    selectOrderList: (state) => state.orderList,
    selectOrder: (state) => state.selectedOrder,
    selectNewOrder: (state) => state.newOrder,
    selectIsOrderLoading: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, handlePending)
      .addCase(getOrderList.rejected, handleReject)
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderError = null;
        state.orderList = action.payload;
      });
    builder
      .addCase(getOrder.pending, handlePending)
      .addCase(getOrder.rejected, handleReject)
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderError = null;
        state.selectedOrder = action.payload.orders[0];
      });
    builder
      .addCase(postOrder.pending, handlePending)
      .addCase(postOrder.rejected, handleReject)
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderError = null;
        state.newOrder = action.payload.order;
        state.selectedOrder = action.payload.order;
      });
  }
});

export const {
  selectOrderList,
  selectOrder,
  selectNewOrder,
  selectIsOrderLoading
} = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
