import { TestBed } from '@angular/core/testing';

import { ActivityService } from './activity.service';

describe('AcitivityService', () => {
  let service: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
