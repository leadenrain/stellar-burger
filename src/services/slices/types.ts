import { TRegisterData } from '@api';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './auth/thunk';
import { getOrder, getOrderList, postOrder } from './order/order/thunk';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
  ingredientsLoadingError: string | null;
};

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  otherIngredients: Array<TConstructorIngredient>;
};

export type TFeedState = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isFeedLoading: boolean;
  feedLoadingError: string | null;
};

export type TUserState = {
  userData: TUser | null | undefined;
  isAuthLoading: boolean;
  authError: string | null;
};

export type TActionRejected = ReturnType<
  | typeof getUser.rejected
  | typeof registerUser.rejected
  | typeof updateUser.rejected
  | typeof loginUser.rejected
  | typeof logoutUser.rejected
>;

export type TActionFullfilled = ReturnType<
  | typeof getUser.fulfilled
  | typeof registerUser.fulfilled
  | typeof updateUser.fulfilled
  | typeof loginUser.fulfilled
>;

export type TOrderState = {
  orderList: Array<TOrder>;
  selectedOrder: TOrder | null;
  newOrder: TOrder | null;
  isOrderLoading: boolean;
  orderError: string | null;
};

export type TOrderActionRejected = ReturnType<
  | typeof getOrderList.rejected
  | typeof getOrder.rejected
  | typeof postOrder.rejected
>;
