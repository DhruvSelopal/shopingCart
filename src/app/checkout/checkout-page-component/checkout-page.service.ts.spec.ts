import { TestBed } from '@angular/core/testing';

import { CheckoutPageServiceTs } from './checkout-page.service.ts';

describe('CheckoutPageServiceTs', () => {
  let service: CheckoutPageServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutPageServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
