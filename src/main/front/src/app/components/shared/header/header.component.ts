import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MealFilterService } from '../../../services/Meal_filter/meal-filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  CategoryDropdown: boolean = false;
  userDropdown: boolean = false;

  constructor(
    private mealFilterService: MealFilterService,
    private router: Router
  ) {}

  onCategorySelected(category: string | null): void {
    this.mealFilterService.setSelectedCategory(category);
  }

  toggleCategoryDropdown(): void {
    this.CategoryDropdown = !this.CategoryDropdown;
  }

  toggleUserDropdown(): void {
    this.userDropdown = !this.userDropdown;
  }

  navigateToMainPageAndFilter(category: string | null): void {
    this.router.navigate(['/']); 
    this.onCategorySelected(category); 
  }
  
}
