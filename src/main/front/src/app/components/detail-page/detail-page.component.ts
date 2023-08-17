import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from '../../services/Meals.service'; 
import { TypeService } from '../../services/Types.service'; 
import { Meals } from '../../models/Meals.model'; 
import { Types} from '../../models/Types.model'; 

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  meal: Meals | undefined;
  mealType: Types | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private mealsService: MealsService,
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
  
      if (idParam !== null) {
        const mealId = +idParam;
        const isValidMealId = !isNaN(mealId);
  
        isValidMealId
          ? this.loadMealData(mealId)
          : console.error(`Invalid meal ID: ${idParam}`);
      } else {
        console.error('Meal ID parameter is missing');
      }
    });
  }
  
  private loadMealData(mealId: number): void {
    this.mealsService.getMealById(mealId).subscribe(meal => {
      this.meal = meal;
      console.log(this.meal)
      if (meal.type !== null && meal.type.id !== null) {
        this.typeService.getTypeById(meal.type.id).subscribe(type => {
          this.mealType = type!;

        });
        console.log(this.mealType)
      }
    });
  }
  goToMainPage(): void {
    this.router.navigate(['']);
  }
}