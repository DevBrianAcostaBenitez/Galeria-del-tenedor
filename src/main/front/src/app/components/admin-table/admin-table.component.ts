import { Component, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MealsService } from '../../services/Meals.service';
import { Meals } from '../../models/Meals.model';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MealFilterService } from '../../services/Meal_filter/meal-filter.service';
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
  selectedCategory: string | null = null;
  meals: any[] = []; 
  filteredMeals: Meals[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(private mealsService: MealsService,
     private mealFilterService: MealFilterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mealsService.getAllMeals().subscribe((data) => {
      this.meals = data;
      this.subscribeToCategoryChanges();
      this.subscribeToNavigationEnd();
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
  deleteMeal(mealId: number) {
    if (mealId !== undefined) {
      this.mealsService.deleteMeal(mealId).subscribe(() => {
        this.meals = this.meals.filter(meal => meal.id !== mealId);
      });
    }
  }

}