import { TestBed } from '@angular/core/testing';

import { ResolvingComponentService } from './resolving-component.service';

describe('ResolvingComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolvingComponentService = TestBed.get(ResolvingComponentService);
    expect(service).toBeTruthy();
  });
});
