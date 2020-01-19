import * as fromAuth from './reducer';
import { selectStatusState } from './selectors';

describe('Auth Status Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStatusState({
      [fromAuth.statusFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
