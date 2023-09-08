import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MealsService } from '../../services/Meals.service';
import { Meals } from '../../models/Meals.model';
import { MealFilterService } from '../../services/Meal_filter/meal-filter.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  meals: Meals[] = [];
  filteredMeals: Meals[] = [];
  selectedCategory: string | null = null;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private mealsService: MealsService,
    private mealFilterService: MealFilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMeals();
    this.subscribeToCategoryChanges();
    this.subscribeToNavigationEnd();
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadMeals(): void {
    this.mealsService.getAllMeals().subscribe(meals => {
      this.meals = meals;
      this.applyFilter();
    });
  }

  

  subscribeToCategoryChanges(): void {
    this.mealFilterService.selectedCategory$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(category => {
        this.selectedCategory = category;
        this.applyFilter();
      });
  }

  subscribeToNavigationEnd(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: NavigationEnd) => {
          this.applyFilter();
      });
  }

  applyFilter(): void {
    this.filteredMeals = this.selectedCategory
      ? this.meals.filter(meal => meal.type?.name === this.selectedCategory)
      : this.meals;
  }
}
