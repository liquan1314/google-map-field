import { TestBed } from '@angular/core/testing';

import { ObservabService } from './observab.service';

describe('ObservabService', () => {
  let service: ObservabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
