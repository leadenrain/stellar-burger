import { feedReducer, initialState } from './feedSlice';
import { mockedFeed } from './mockData';
import { fetchFeed } from './thunk';

describe('Feed reducer', () => {
  it('should handle fetchFeed.pending', () => {
    const action = fetchFeed.pending.type;
    const newState = feedReducer(initialState, { type: action });

    expect(newState.isFeedLoading).toBe(true);
    expect(newState.feedLoadingError).toBeNull();
  });

  it('should handle fetchFeed.fulfilled', () => {
    const action = fetchFeed.fulfilled(mockedFeed, '');
    const newState = feedReducer(initialState, action);

    expect(newState.isFeedLoading).toBe(false);
    expect(newState.feedLoadingError).toBeNull();
    expect(newState.orders).toEqual(mockedFeed.orders);
    expect(newState.total).toBe(mockedFeed.total);
    expect(newState.totalToday).toBe(mockedFeed.totalToday);
  });

  it('should handle fetchFeed.rejected', () => {
    const errorMessage = 'Failed to fetch feed';
    const error = new Error(errorMessage);
    const loadingState = {
      ...initialState,
      isFeedLoading: true
    };

    const action = fetchFeed.rejected(error, '');
    const newState = feedReducer(loadingState, action);

    expect(newState.isFeedLoading).toBe(false);
    expect(newState.feedLoadingError).toBe(errorMessage);
  });
});
