import { rootReducer } from './reducer';
import store from './store';

describe('Root reducer', () => {
  it('should return correct state', () => {
    const initState = store.getState();
    const expState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initState).toEqual(expState);
  });
});
