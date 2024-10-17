import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  deleteIngredient,
  initialState,
  moveDownIngredient,
  moveUpIngredient
} from './constructorSlice';
import { ingredientsToAdd, ingredientsToMove } from './mockData';

describe('Burger constructor reducer', () => {
  describe('check addIngredient action', () => {
    it('should add ingredient to the otherIngredients array', () => {
      const ingredient = ingredientsToAdd[0];
      const action = addIngredient(ingredient);
      const newState = constructorReducer(initialState, action);

      console.log(newState.otherIngredients[0]);
      console.log(ingredient);

      expect(newState.otherIngredients[0]).toEqual(
        expect.objectContaining(ingredient)
      );
    });

    it('should add ingredient to the bun array', () => {
      const bun = ingredientsToAdd[1];
      const action = addIngredient(bun);
      const newState = constructorReducer(initialState, action);

      expect(newState.bun).toEqual(expect.objectContaining(bun));
    });
  });

  describe('check deletion', () => {
    it('should remove ingredient from the otherIngredients array', () => {
      const prevState = {
        bun: null,
        otherIngredients: ingredientsToMove
      };
      const action = deleteIngredient(ingredientsToMove[1]);
      const newState = constructorReducer(prevState, action);

      expect(newState.otherIngredients).not.toContainEqual(
        ingredientsToMove[1]
      );
    });

    it('should remove all inredients', () => {
      const prevState = {
        bun: ingredientsToMove[2],
        otherIngredients: [ingredientsToMove[0], ingredientsToMove[1]]
      };
      const action = clearConstructor();
      const newState = constructorReducer(prevState, action);
      expect(newState.bun).toBe(null);
      expect(newState.otherIngredients).toEqual([]);
    });
  });

  describe('check move actions', () => {
    const prevState = {
      bun: null,
      otherIngredients: ingredientsToMove
    };
    it('should move ingredient from 2 to 1', () => {
      const action = moveUpIngredient(1);
      const newState = constructorReducer(prevState, action);
      expect(newState.otherIngredients[1].id).toBe(
        prevState.otherIngredients[0].id
      );
      expect(newState.otherIngredients[0].id).toBe(
        prevState.otherIngredients[1].id
      );
    });
    it('should move ingredient from 1 to 2', () => {
      const action = moveDownIngredient(0);
      const newState = constructorReducer(prevState, action);
      expect(newState.otherIngredients[1].id).toBe(
        prevState.otherIngredients[0].id
      );
      expect(newState.otherIngredients[0].id).toBe(
        prevState.otherIngredients[1].id
      );
    });
  });
});
