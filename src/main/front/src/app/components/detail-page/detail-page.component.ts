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
  fromRoute: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private mealsService: MealsService,
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    const routeData = this.route.snapshot.data;
    this.fromRoute =  routeData['fromRoute'] || '';
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
    if (mealId !== undefined) {
      this.mealsService.getMealById(mealId).subscribe(meal => {
        this.meal = meal;
        console.log(this.meal);
        if (meal.type !== null && meal.type?.id !== undefined) {
          this.typeService.getTypeById(meal.type?.id).subscribe(type => {
            this.mealType = type!;
            console.log(this.mealType);
          });
        }
      });
    } else {
      console.error('Invalid mealId');
    }
  }
  
  goToMainPage(): void {
    const route = (this.fromRoute === 'admin') ? '/admin' : '';
    this.router.navigate([route]);
  }
}