import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RootEffects } from 'src/app/store/effects';

describe('RootEffects', () => {
  let actions$: Observable<any>;
  let effects: RootEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get<RootEffects>(RootEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
