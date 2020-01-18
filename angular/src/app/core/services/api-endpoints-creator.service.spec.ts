import { TestBed } from '@angular/core/testing';

import { ApiEndpointsCreatorService } from './api-endpoints-creator.service';

describe('ApiEndpointsCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiEndpointsCreatorService = TestBed.get(ApiEndpointsCreatorService);
    expect(service).toBeTruthy();
  });
});
