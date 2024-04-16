import { TestBed } from '@angular/core/testing';

import { MegallokService } from './megallok.service';

describe('MegallokService', () => {
  let service: MegallokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegallokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
