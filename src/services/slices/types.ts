import { TConstructorIngredient, TIngredient, TOrder } from '../../utils/types';

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
