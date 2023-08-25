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
    });
  }

}
