import { TIngredient } from '../../utils/types';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
  ingredientsLoadingError: string | null;
};
