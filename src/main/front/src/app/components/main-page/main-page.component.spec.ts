import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { MealsService } from '../../services/Meals.service';
import { MealFilterService } from '../../services/Meal_filter/meal-filter.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  const mockMealsService = {
    getAllMeals: () => of([]),
  };

  const mockMealFilterService = {
    selectedCategory$: of('Postres'),
  };

  const mockRouter = {
    events: of(), 
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      providers: [
        { provide: MealsService, useValue: mockMealsService },
        { provide: MealFilterService, useValue: mockMealFilterService },
        { provide: Router, useValue: mockRouter }, 
      ],
    });
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load meals on initialization', () => {
    const mealsService = TestBed.inject(MealsService);
    const loadMealsSpy = spyOn(mealsService, 'getAllMeals').and.returnValue(of([]));

    component.ngOnInit();

    expect(loadMealsSpy).toHaveBeenCalled();
  });

  it('should subscribe to category changes', () => {
    const mealFilterService = TestBed.inject(MealFilterService);
    const subscribeToCategoryChangesSpy = spyOn(mealFilterService.selectedCategory$, 'subscribe');

    component.ngOnInit();

    expect(subscribeToCategoryChangesSpy).toHaveBeenCalled();
  });

  it('should apply filter when category changes', () => {
    const mealsService = TestBed.inject(MealsService);
    const loadMealsSpy = spyOn(mealsService, 'getAllMeals').and.returnValue(of([]));

    component.ngOnInit();
    component.applyFilter();

    expect(loadMealsSpy).toHaveBeenCalled();
    expect(component.filteredMeals.length).toBe(0);
  });
});
