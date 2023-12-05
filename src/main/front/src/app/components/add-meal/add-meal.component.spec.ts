import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddMealComponent } from './add-meal.component';

describe('AddMealComponent', () => {
  let component: AddMealComponent;
  let fixture: ComponentFixture<AddMealComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddMealComponent],
      imports: [FormsModule, RouterModule.forRoot([]), HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['types']).toEqual([]);
    expect(component['selectedType']).toBeNull();
    expect(component['mealData']).toEqual({
      name: '',
      type: null,
      ingredients: '',
      recipe: '',
      imgUrl: ''
    });
    expect(component['image']).toBeNull();
    expect(component['imgUrl']).toBeUndefined();
  });

  it('should load types on initialization', () => {
    spyOn<any>(component, 'loadTypes').and.callThrough();
    component.ngOnInit();
    expect(component['loadTypes']).toHaveBeenCalled();
  });

  it('should open file input when onFileImageClick is called', () => {
    spyOn<any>(component.imageInputRef.nativeElement, 'click');
    component.onFileImageClick();
    expect(component.imageInputRef.nativeElement.click).toHaveBeenCalled();
  });

  it('should set image and imgUrl when onFileSelected is called', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [mockFile] } };
    spyOn<any>(component, 'getObjectURL').and.returnValue('mockImageUrl');
    component.onFileSelected(event);
    expect(component['image']).toEqual(mockFile);
    expect(component['imgUrl']).toEqual('test.png');
  });

  it('should return correct object URL when getObjectURL is called with a file', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const objectURL = component['getObjectURL'](mockFile);
    expect(objectURL).toContain('blob');
  });

  it('should set mealData and call mealsService when addMeal is called with valid form data', () => {
    component['selectedType'] = { id: 1, name: 'Test Type' }; 
    component['mealData'] = {
      name: 'Test Meal',
      type: null,
      ingredients: 'Test Ingredients',
      recipe: 'Test Recipe',
      imgUrl: 'test.png'
    };
    spyOn<any>(component['mealsService'], 'saveMeal').and.callThrough();
    component['addMeal']();
    expect(component['mealData'].type).toEqual({ id: 1, name: 'Test Type' });
    expect(component['mealsService'].saveMeal).toHaveBeenCalled();
  });

  it('should not call mealsService when addMeal is called with invalid form data', () => {
    spyOn(window, 'alert');
    const saveMealSpy = spyOn((component as any)['mealsService'], 'saveMeal').and.callThrough();

    (component as any)['addMeal'](); 

    expect(window.alert).toHaveBeenCalledWith('Por favor, complete todos los campos.');
    expect(saveMealSpy).not.toHaveBeenCalled();
  });
  
  

});
