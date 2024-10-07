import { TActionFullfilled, TActionRejected, TUserState } from '../types';

export const handlePending = (state: TUserState) => {
  state.isAuthLoading = true;
  state.isAuthorized = false;
  state.authError = null;
};

export const handleReject = (state: TUserState, action: TActionRejected) => {
  state.isAuthorized = false;
  state.isAuthLoading = false;
  state.authError = action.error.message || null;
};

export const handleFullfilled = (
  state: TUserState,
  action: TActionFullfilled
) => {
  state.isAuthorized = true;
  state.isAuthLoading = false;
  state.authError = null;
  state.userData = action.payload;
};
