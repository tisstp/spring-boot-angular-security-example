import { TestBed } from '@angular/core/testing';

import { ApiPrefixInterceptor } from 'src/app/core/http/api-prefix.interceptor';

describe('ApiPrefixInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPrefixInterceptor = TestBed.get(ApiPrefixInterceptor);
    expect(service).toBeTruthy();
  });
});
