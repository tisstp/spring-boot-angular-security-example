import { TestBed } from '@angular/core/testing';

import { XsrfInterceptor } from 'src/app/core/http/xsrf.interceptor';

describe('XsrfInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XsrfInterceptor = TestBed.get(XsrfInterceptor);
    expect(service).toBeTruthy();
  });
});
