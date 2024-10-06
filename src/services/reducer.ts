import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/burger/ingredients/ingredientsSlice';
import { constructorReducer } from './slices/burger/constructor/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: constructorReducer
});
