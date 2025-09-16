import { TestBed } from '@angular/core/testing';

import { HomepageresolverServiceTs } from './homepageresolver.service.ts';

describe('HomepageresolverServiceTs', () => {
  let service: HomepageresolverServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepageresolverServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
