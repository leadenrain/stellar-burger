import { TActionFullfilled, TActionRejected, TUserState } from '../types';

export const handlePending = (state: TUserState) => {
  state.isAuthLoading = true;
  state.authError = null;
};

export const handleReject = (state: TUserState, action: TActionRejected) => {
  state.isAuthLoading = false;
  state.authError = action.error.message || null;
  state.userData = null;
};

export const handleFullfilled = (
  state: TUserState,
  action: TActionFullfilled
) => {
  state.isAuthLoading = false;
  state.authError = null;
  state.userData = action.payload;
};
