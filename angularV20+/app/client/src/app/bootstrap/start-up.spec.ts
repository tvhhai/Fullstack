import { TestBed } from '@angular/core/testing';

import { StartUp } from './start-up';

describe('StartUp', () => {
  let service: StartUp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartUp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
