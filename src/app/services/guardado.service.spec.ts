import { TestBed } from '@angular/core/testing';

import { GuardadoService } from './guardado.service';

describe('GuardadoService', () => {
  let service: GuardadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
