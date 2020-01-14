import { TestBed } from '@angular/core/testing';

import { ApiEndpointsService } from './api-endpoints.service';

describe('ApiEndpointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEndpointsService = TestBed.get(ApiEndpointsService);
    expect(service).toBeTruthy();
  });
});
