import { TestBed } from '@angular/core/testing';

import { StepDataService } from './step-data.service';

describe('StepDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepDataService = TestBed.get(StepDataService);
    expect(service).toBeTruthy();
  });
});
