import { TestBed } from '@angular/core/testing';

import { PreLoader } from './pre-loader';

describe('PreLoader', () => {
  let service: PreLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
