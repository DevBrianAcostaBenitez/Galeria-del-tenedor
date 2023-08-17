import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/Meals.service'; 
import { TypeService } from '../../services/Types.service'; 
import { Meals } from '../../models/Meals.model'; 
import { Types} from '../../models/Types.model'; 

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  meals: Meals[] = [];
  types: Types[] = [];

  constructor(private mealsService: MealsService, private typeService: TypeService) { }

  ngOnInit(): void {
    this.getMeals();
    this.getTypes();
    console.log(this.meals)
    console.log(this.types)
  }
 
  getMeals(): void {
    this.mealsService.getAllMeals().subscribe(
      meals => this.meals = meals,
      error => console.error('Error fetching meals', error)
    );
  }

  getTypes(): void {
    this.typeService.getAllTypes().subscribe(
      types => this.types = types,
      error => console.error('Error fetching types', error)
    );
  }
}
