import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminTableComponent } from './admin-table.component';
import { MealsService } from '../../services/Meals.service';
import { MealFilterService } from '../../services/Meal_filter/meal-filter.service';


describe('AdminTableComponent', () => {
  let component: AdminTableComponent;
  let fixture: ComponentFixture<AdminTableComponent>;
  let mealsService: MealsService;
  let mealFilterService: MealFilterService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTableComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin', component: AdminTableComponent },
          
        ]),
        HttpClientTestingModule,
      ],
      providers: [
        MealsService,
        MealFilterService,
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(1, 'url', 'url'))
          }
        }
      ],
    });
  
    fixture = TestBed.createComponent(AdminTableComponent);
    component = fixture.componentInstance;
    mealsService = TestBed.inject(MealsService);
    mealFilterService = TestBed.inject(MealFilterService);
    router = TestBed.inject(Router);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to category changes', () => {
  
    mealFilterService.selectedCategory$ = of('SomeCategory');

    fixture.detectChanges();

    expect(component.selectedCategory).toEqual('SomeCategory');
  });

  it('should apply filter based on selected category', () => {
  
    const mockMeals = [
      { id: 1, type: { name: 'Category1' } },
      { id: 2, type: { name: 'Category2' } },
      { id: 3, type: { name: 'Category1' } },
    ];

    component.meals = mockMeals;
    component.selectedCategory = 'Category1';

    component.applyFilter();

    expect(component.filteredMeals.length).toEqual(2);
  });

  it('should delete a meal', () => {
    const mealIdToDelete = 1;
    mealsService.deleteMeal = jasmine.createSpy().and.returnValue(of(null));

    component.meals = [{ id: 1 }, { id: 2 }, { id: 3 }];

    component.deleteMeal(mealIdToDelete);

    expect(mealsService.deleteMeal).toHaveBeenCalledWith(mealIdToDelete);
    expect(component.meals.length).toEqual(2);
  });
});
