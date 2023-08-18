import { TestBed } from '@angular/core/testing';

import { MealFilterService } from './meal-filter.service';

describe('MealFilterService', () => {
  let service: MealFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
