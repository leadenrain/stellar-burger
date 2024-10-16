import {
  mockedLoginUser,
  mockedRegisterUser,
  mockedUserData
} from './mockData';
import { getUser, loginUser, logoutUser, registerUser } from './thunk';
import { authReducer, initialState } from './userSlice';

describe('Auth reducer', () => {
  describe('check getUser', () => {
    it('should handle getUser.pending', () => {
      const action = getUser.pending.type;
      const newState = authReducer(initialState, { type: action });
      expect(newState.isAuthLoading).toBe(true);
      expect(newState.authError).toBeNull();
    });

    it('should handle getUser.fulfilled', () => {
      const action = getUser.fulfilled(mockedUserData, '');
      const newState = authReducer(initialState, action);
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBeNull();
      expect(newState.userData).toEqual(mockedUserData);
    });

    it('should handle getUser.rejected', () => {
      const errorMessage = 'Failed to fetch user';
      const action = getUser.rejected(new Error(errorMessage), '');
      const newState = authReducer(initialState, action);
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBe(errorMessage);
    });
  });

  describe('check registerUser', () => {
    it('should handle registerUser.pending', () => {
      const action = registerUser.pending.type;
      const newState = authReducer(initialState, { type: action });
      expect(newState.isAuthLoading).toBe(true);
      expect(newState.authError).toBeNull();
    });

    it('should handle registerUser.fulfilled', () => {
      const action = registerUser.fulfilled(
        mockedUserData,
        '',
        mockedRegisterUser
      );
      const newState = authReducer(initialState, action);
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBeNull();
      expect(newState.userData).toEqual(mockedUserData);
    });

    it('should handle registerUser.rejected', () => {
      const errorMessage = 'Registration failed';
      const action = registerUser.rejected(
        new Error(errorMessage),
        '',
        mockedRegisterUser
      );
      const newState = authReducer(initialState, action);
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBe(errorMessage);
    });
  });

  describe('check login/logout', () => {
    it('should handle loginUser.pending', () => {
      const action = loginUser.pending.type;
      const newState = authReducer(initialState, { type: action });
      expect(newState.isAuthLoading).toBe(true);
      expect(newState.authError).toBeNull();
    });

    it('should handle loginUser.fulfilled', () => {
      const action = loginUser.fulfilled(mockedUserData, '', mockedLoginUser);
      const newState = authReducer(initialState, action);
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBeNull();
      expect(newState.userData).toEqual(mockedUserData);
    });

    it('should handle loginUser.rejected', () => {
      const errorMessage = 'Login failed';
      const action = loginUser.rejected(
        new Error(errorMessage),
        '',
        mockedLoginUser
      );
      const newState = authReducer(initialState, action);
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBe(errorMessage);
    });

    it('should handle logoutUser.fulfilled', () => {
      const action = logoutUser.fulfilled.type;
      const newState = authReducer(initialState, { type: action });
      expect(newState.isAuthLoading).toBe(false);
      expect(newState.authError).toBeNull();
      expect(newState.userData).toBeNull();
    });
  });
});
