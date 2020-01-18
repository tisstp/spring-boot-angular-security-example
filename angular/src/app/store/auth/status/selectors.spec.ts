import * as fromStatus from 'src/app/store/auth/status/reducer';
import { selectStatusState } from 'src/app/store/auth/status/selectors';

describe('Status Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStatusState({
      [fromStatus.statusFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
