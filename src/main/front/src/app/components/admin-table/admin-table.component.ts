import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/Meals.service';
import { Meals } from '../../models/Meals.model';
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
  meals: Meals[] = [];

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.mealsService.getAllMeals().subscribe((data) => {
      this.meals = data;
      console.log(this.meals)
    });
  }
  deleteMeal(mealId: number) {
    if (mealId !== undefined) {
      this.mealsService.deleteMeal(mealId).subscribe(() => {
        this.meals = this.meals.filter(meal => meal.id !== mealId);
      });
    }
  }

}