import { TestBed } from '@angular/core/testing';

import { PressureIndicatorService } from './pressure-indicator.service';

describe('PressureIndicatorService', () => {
  let service: PressureIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PressureIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
