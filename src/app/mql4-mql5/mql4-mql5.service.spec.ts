import { TestBed } from '@angular/core/testing';

import { Mql4Mql5Service } from './mql4-mql5.service';

describe('Mql4Mql5Service', () => {
  let service: Mql4Mql5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mql4Mql5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
