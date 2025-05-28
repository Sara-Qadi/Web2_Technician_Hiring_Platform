import { TestBed } from '@angular/core/testing';

import { ProfileModalService } from './profile-modal.service';

describe('ProfileModalService', () => {
  let service: ProfileModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
