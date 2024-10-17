import { mockedOrder } from './mockData';
import { clearOrder, initialState, orderReducer } from './orderSlice';
import { getOrder, getOrderList, postOrder } from './thunk';

describe('Order reducer', () => {
  describe('check getOrderList', () => {
    it('should handle getOrderList.pending', () => {
      const action = getOrderList.pending.type;
      const newState = orderReducer(initialState, { type: action });
      expect(newState.isOrderLoading).toBe(true);
      expect(newState.orderError).toBeNull();
    });

    it('should handle getOrderList.fulfilled', () => {
      const action = getOrderList.fulfilled(mockedOrder.orders, '');
      const newState = orderReducer(initialState, action);
      expect(newState.isOrderLoading).toBe(false);
      expect(newState.orderError).toBeNull();
      expect(newState.orderList).toEqual(mockedOrder.orders);
    });

    it('should handle getOrderList.rejected', () => {
      const error = new Error('Error occurred');
      const action = getOrderList.rejected(error, '');
      const newState = orderReducer(initialState, action);
      expect(newState.isOrderLoading).toBe(false);
      expect(newState.orderError).toBe(error.message);
    });
  });

  describe('check getOrder', () => {
    it('should handle getOrder.pending', () => {
      const action = getOrder.pending.type;
      const newState = orderReducer(initialState, { type: action });
      expect(newState.isOrderLoading).toBe(true);
      expect(newState.orderError).toBeNull();
    });

    it('should handle getOrder.fulfilled', () => {
      const action = getOrder.fulfilled(
        mockedOrder,
        '',
        mockedOrder.orders[0].number
      );
      const newState = orderReducer(initialState, action);
      expect(newState.isOrderLoading).toBe(false);
      expect(newState.orderError).toBeNull();
      expect(newState.selectedOrder).toEqual(mockedOrder.orders[0]);
    });

    it('should handle getOrder.rejected', () => {
      const error = new Error('Error occurred');
      const action = getOrder.rejected(error, '', mockedOrder.orders[0].number);
      const newState = orderReducer(initialState, action);
      expect(newState.isOrderLoading).toBe(false);
      expect(newState.orderError).toBe(error.message);
    });
  });

  describe('check postOrder', () => {
    it('should handle postOrder.pending', () => {
      const action = postOrder.pending.type;
      const newState = orderReducer(initialState, { type: action });
      expect(newState.isOrderLoading).toBe(true);
      expect(newState.orderError).toBeNull();
    });

    it('should handle postOrder.fulfilled', () => {
      const newOrder = {
        name: '5432',
        success: true,
        order: mockedOrder.orders[0]
      };
      const action = postOrder.fulfilled(newOrder, '', ['']);
      const newState = orderReducer(initialState, action);
      expect(newState.isOrderLoading).toBe(false);
      expect(newState.orderError).toBeNull();
      expect(newState.newOrder).toEqual(mockedOrder.orders[0]);
      expect(newState.selectedOrder).toEqual(mockedOrder.orders[0]);
    });

    it('should handle postOrder.rejected', () => {
      const error = new Error('Error occurred');
      const action = postOrder.rejected(error, '', ['']);
      const newState = orderReducer(initialState, action);
      expect(newState.isOrderLoading).toBe(false);
      expect(newState.orderError).toBe(error.message);
    });
  });

  it('should handle clearOrder', () => {
    const action = clearOrder();
    const newState = orderReducer(initialState, action);
    expect(newState.selectedOrder).toBeNull();
  });
});
