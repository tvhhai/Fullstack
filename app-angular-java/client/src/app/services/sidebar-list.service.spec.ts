import { TestBed } from '@angular/core/testing';

import { SidebarListService } from './sidebar-list.service';

describe('SidebarListService', () => {
  let service: SidebarListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
