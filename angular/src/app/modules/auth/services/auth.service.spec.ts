import { TestBed } from '@angular/core/testing';

import { AuthService } from 'src/app/modules/auth/services/auth.service';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});