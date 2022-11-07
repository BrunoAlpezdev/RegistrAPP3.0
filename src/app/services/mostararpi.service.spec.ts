import { TestBed } from '@angular/core/testing';

import { MostararpiService } from './mostararpi.service';

describe('MostararpiService', () => {
  let service: MostararpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostararpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
