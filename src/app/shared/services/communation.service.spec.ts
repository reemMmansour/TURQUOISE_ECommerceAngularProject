import { TestBed } from '@angular/core/testing';

import { CommunationService } from './communation.service';

describe('CommunationService', () => {
  let service: CommunationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
