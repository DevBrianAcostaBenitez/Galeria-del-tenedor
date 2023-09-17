import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditMealComponent } from './edit-meal.component';
import { MealsService } from '../../services/Meals.service';
import { TypeService } from '../../services/Types.service';
import { Meals } from '../../models/Meals.model';
import { Types } from '../../models/Types.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditMealComponent', () => {
  let component: EditMealComponent;
  let fixture: ComponentFixture<EditMealComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (param: string) => '1',
      },
    },
  };

  const mockMealsService = {
    getMealById: () => of({
      id: 1,
      name: 'Test Meal',
      type: {
        id: 1,
        name: 'Test Type',
      },
      ingredients: 'Test Ingredients',
      recipe: 'Test Recipe',
      imgUrl: 'test-image.jpg',
    } as Meals),
    updateMeal: () => of({
      name: 'Updated Test Meal',
      ingredients: 'Updated Ingredients',
      recipe: 'Updated Recipe',
      imgUrl: 'updated-image.jpg',
    } as Meals),
  };

  const mockTypeService = {
    getAllTypes: () => of([
      {
        id: 1,
        name: 'Type 1',
      },
      {
        id: 2,
        name: 'Type 2',
      },
    ] as Types[]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditMealComponent],
      providers: [
        { provide: MealsService, useValue: mockMealsService },
        { provide: TypeService, useValue: mockTypeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
  
    fixture = TestBed.createComponent(EditMealComponent);
    component = fixture.componentInstance;
  });
  
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load meal and types on initialization', () => {
    const mealsService = TestBed.inject(MealsService);
    const typeService = TestBed.inject(TypeService);

    const loadMealSpy = spyOn(mealsService, 'getMealById').and.callThrough();
    const loadTypesSpy = spyOn(typeService, 'getAllTypes').and.callThrough();

    component.ngOnInit();

    expect(loadMealSpy).toHaveBeenCalledWith(1);
    expect(loadTypesSpy).toHaveBeenCalled();
  });

  it('should update meal', () => {
    const mealsService = TestBed.inject(MealsService);
  
    const updatedMeal: Meals = {
      id: 1, 
      name: 'Updated Test Meal',
      type: {
        id: 6,
        name: 'Mix'
      },
      ingredients: 'Updated Ingredients',
      recipe: 'Updated Recipe',
      imgUrl: 'updated-image.jpg',
    };
  
    const updateMealSpy = spyOn(mealsService, 'updateMeal').and.returnValue(of(updatedMeal));
  
    component.selectedType = {
      id: 2,
      name: 'Type 2',
    } as Types;
    component.mealData.name = 'Updated Test Meal';
  
    component.editMeal();
  
    expect(component.mealData).toEqual(updatedMeal);
  
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });
  
  

  it('should show an alert if form is not valid', () => {
    const alertSpy = spyOn(window, 'alert');

    component.editMeal();

    expect(alertSpy).toHaveBeenCalledWith('Por favor, complete todos los campos.');
  });
});
