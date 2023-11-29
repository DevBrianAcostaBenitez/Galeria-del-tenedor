import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminTableComponent } from './admin-table.component';
import { MealsService } from '../../services/Meals.service';
import { MealFilterService } from '../../services/Meal_filter/meal-filter.service';
import { Subject, of } from 'rxjs';

class MockMealFilterService {
  selectedCategory$ = of('Postres');
}

describe('AdminTableComponent', () => {
  let component: AdminTableComponent;
  let fixture: ComponentFixture<AdminTableComponent>;
  let mealsService: MealsService;
  let mealFilterService: MealFilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTableComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MealsService,
        {
          provide: MealFilterService,
          useClass: MockMealFilterService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTableComponent);
    component = fixture.componentInstance;
    mealsService = TestBed.inject(MealsService);
    mealFilterService = TestBed.inject(MealFilterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to category changes', () => {
    const mealFilterService = TestBed.inject(MealFilterService);
    const subscribeToCategoryChangesSpy = spyOn(mealFilterService.selectedCategory$, 'subscribe').and.callThrough();
  
    component.ngOnInit();
  
    expect(subscribeToCategoryChangesSpy).toHaveBeenCalled();
  });
  

  it('should apply filter based on selected category', () => {
    const mockMeals = [
      { id: 1, type: { name: 'Postres' } },
      { id: 2, type: { name: 'Mix' } },
    ];
    component.meals = mockMeals;
    component.selectedCategory = 'Postres';
    component.applyFilter();
    expect(component.filteredMeals.length).toEqual(1); 
  });


  it('should delete a meal', () => {
    const mealIdToDelete = 1;
    spyOn(mealsService, 'deleteMeal').and.returnValue(of(undefined));
    component.meals = [{ id: 1 }, { id: 2 }];
    component.deleteMeal(mealIdToDelete);
    expect(mealsService.deleteMeal).toHaveBeenCalledWith(mealIdToDelete);
    expect(component.meals.length).toEqual(1); 
  });
});
