import { TestBed, inject } from '@angular/core/testing';

import { SharedCustomerDataService } from './shared-customer-data.service';

describe('SharedCustomerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedCustomerDataService]
    });
  });

  it('should be created', inject([SharedCustomerDataService], (service: SharedCustomerDataService) => {
    expect(service).toBeTruthy();
  }));
});
