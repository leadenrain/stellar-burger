import { TOrderActionRejected, TOrderState } from '../../types';

export const handlePending = (state: TOrderState) => {
  state.isOrderLoading = true;
  state.orderError = null;
};

export const handleReject = (
  state: TOrderState,
  action: TOrderActionRejected
) => {
  state.isOrderLoading = false;
  state.orderError = action.error.message || 'Unknown error. Try again';
};
