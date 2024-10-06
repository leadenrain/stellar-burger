import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { TConstructorState } from '../../types';
import { TConstructorIngredient, TIngredient } from '../../../../utils/types';

const initialState: TConstructorState = {
  bun: null,
  otherIngredients: []
};

export const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.otherIngredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.otherIngredients = state.otherIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        [
          state.otherIngredients[action.payload - 1],
          state.otherIngredients[action.payload]
        ] = [
          state.otherIngredients[action.payload],
          state.otherIngredients[action.payload - 1]
        ];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload < state.otherIngredients.length) {
        [
          state.otherIngredients[action.payload],
          state.otherIngredients[action.payload + 1]
        ] = [
          state.otherIngredients[action.payload + 1],
          state.otherIngredients[action.payload]
        ];
      }
    },
    deleteBurger: (state) => {
      state = initialState;
    }
  },
  selectors: {
    getBun: (state: TConstructorState) => state.bun,
    getOtherIngredients: (state: TConstructorState) => state.otherIngredients
  }
});

export const { getBun, getOtherIngredients } = constructorSlice.selectors;
export const constructorReducer = constructorSlice.reducer;
export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient
} = constructorSlice.actions;
