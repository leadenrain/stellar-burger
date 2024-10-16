import { ingredientsReducer, initialState } from './ingredientsSlice';
import { mockedIngredients } from './mockData';
import { fetchIngredients } from './thunk';

describe('Ingredients reducer', () => {
  it('should handle fetchIngredients.pending', () => {
    const action = fetchIngredients.pending.type;
    const newState = ingredientsReducer(initialState, { type: action });

    expect(newState.isIngredientsLoading).toBe(true);
    expect(newState.ingredientsLoadingError).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = fetchIngredients.fulfilled(mockedIngredients, '');
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.ingredients).toEqual(mockedIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const error = new Error(errorMessage);
    const loadingState = {
      ...initialState,
      isIngredientsLoading: true
    };
    const action = fetchIngredients.rejected(error, '');
    const newState = ingredientsReducer(loadingState, action);

    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.ingredientsLoadingError).toBe(errorMessage);
  });
});
