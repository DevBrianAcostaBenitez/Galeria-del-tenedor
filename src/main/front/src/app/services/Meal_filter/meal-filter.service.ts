import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealFilterService {
  private selectedMealCategory = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedMealCategory.asObservable();

  setSelectedCategory(category: string | null): void {
    this.selectedMealCategory.next(category);
  }
}