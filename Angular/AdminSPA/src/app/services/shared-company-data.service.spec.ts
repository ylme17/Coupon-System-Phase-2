import { TestBed, inject } from '@angular/core/testing';

import { SharedCompanyDataService } from './shared-company-data.service';

describe('SharedCompanyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedCompanyDataService]
    });
  });

  it('should be created', inject([SharedCompanyDataService], (service: SharedCompanyDataService) => {
    expect(service).toBeTruthy();
  }));
});
