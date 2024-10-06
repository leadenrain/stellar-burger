import { TConstructorIngredient, TIngredient } from '../../utils/types';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
  ingredientsLoadingError: string | null;
};

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  otherIngredients: Array<TConstructorIngredient>;
};
