import { TestBed } from '@angular/core/testing';

import { ConditionService } from './condition.service';

describe('ConditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConditionService = TestBed.get(ConditionService);
    expect(service).toBeTruthy();
  });
});
