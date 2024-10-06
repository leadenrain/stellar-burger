import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/burger/ingredients/ingredientsSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
});
