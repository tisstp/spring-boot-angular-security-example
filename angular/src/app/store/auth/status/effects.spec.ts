import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StatusEffects } from 'src/app/store/auth/status/effects';

describe('StatusEffects', () => {
  let actions$: Observable<any>;
  let effects: StatusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<StatusEffects>(StatusEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
