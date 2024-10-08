import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/burger/ingredients/ingredientsSlice';
import { constructorReducer } from './slices/burger/constructor/constructorSlice';
import { feedReducer } from './slices/order/feed/feedSlice';
import { authReducer } from './slices/auth/userSlice';
import { orderReducer } from './slices/order/order/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: constructorReducer,
  feed: feedReducer,
  authorization: authReducer,
  order: orderReducer
});
