import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from 'src/app/core/http/token.interceptor';

describe('AccessAllowInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInterceptor = TestBed.get(TokenInterceptor);
    expect(service).toBeTruthy();
  });
});
