import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DetailPageComponent } from './detail-page.component';
import { MealsService } from '../../services/Meals.service';
import { TypeService } from '../../services/Types.service';
import { Meals } from '../../models/Meals.model';
import { Types } from '../../models/Types.model';
describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockActivatedRoute = {
    snapshot: {
      data: {
        fromRoute: 'admin', 
      },
      paramMap: {
        get: (param: string) => '1',
      },
    },
    paramMap: of({
      get: () => '1',
    }),
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
      deleteMeal: (mealId: number) => of({}), 
  };

  const mockTypeService = {
    getTypeById: () => of({
      id: 1,
      name: 'Test Type',
    } as Types),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPageComponent],
      providers: [
        { provide: MealsService, useValue: mockMealsService },
        { provide: TypeService, useValue: mockTypeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    mockRouter.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load meal and type on initialization', () => {
    const mealsService = TestBed.inject(MealsService);
    const typeService = TestBed.inject(TypeService);

    const loadMealSpy = spyOn(mealsService, 'getMealById').and.callThrough();
    const loadTypeSpy = spyOn(typeService, 'getTypeById').and.callThrough();

    component.ngOnInit();

    expect(loadMealSpy).toHaveBeenCalledWith(1);
    expect(loadTypeSpy).toHaveBeenCalledWith(1);
  });

  afterEach(() => {
    jasmine.createSpy('navigate').and.stub(); // Restaurar el espía navigate
  });
  
  it('should navigate to main page when goToMainPage is called', () => {
    component.goToMainPage();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should delete meal and navigate to main page when deleteMeal is called', () => {
    const deleteMealSpy = spyOn(mockMealsService, 'deleteMeal').and.returnValue(of({}));
    component.meal = { id: 1, name: "name", ingredients: "ingredient", recipe: "recipe" }
    component.fromRoute = 'admin';
    component.deleteMeal();
    
    expect(deleteMealSpy).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });

});
