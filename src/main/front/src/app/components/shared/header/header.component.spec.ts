import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { MealsService } from 'src/app/services/Meals.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule ],
      declarations: [HeaderComponent],
      providers: [MealsService],
    });

  });
  beforeEach(()=> {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the category dropdown', () => {
    component['toggleCategoryDropdown']();
    expect(component['CategoryDropdown']).toBe(true);

    component['toggleCategoryDropdown']();
    expect(component['CategoryDropdown']).toBe(false);
  });


  it('should navigate to the main page and filter', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const onCategorySelectedSpy = spyOn(component['mealFilterService'], 'setSelectedCategory');

    component['navigateToMainPageAndFilter']('Mix'); 

    expect(routerSpy).toHaveBeenCalledWith(['/']);
    expect(onCategorySelectedSpy).toHaveBeenCalledWith('Mix');
  });

});
