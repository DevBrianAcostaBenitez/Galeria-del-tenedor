import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MealsService } from '../../services/Meals.service'; 
import { TypeService } from '../../services/Types.service'; 
import { Meals } from '../../models/Meals.model'; 
import { Types } from '../../models/Types.model';
@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss']
})
export class EditMealComponent implements OnInit {
  types: Types[] = [];
  selectedType: Types | null = null;
  mealData: Meals = {
    name: '',
    type:undefined,
    ingredients: '',
    recipe: '',
    imgUrl: ''
  };
  image: File | null = null;
  @ViewChild('imageInput') imageInputRef!: ElementRef;
  @ViewChild('selectedImage') selectedImage!: ElementRef;
  imgUrl: string | undefined;
  constructor(
    private mealsService: MealsService,
    private typeService: TypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString !== null ? +idString : NaN;
  
    !isNaN(id) ? (this.loadTypes(), this.loadMeal(id)) : console.error('Invalid id:', idString);
  }
  
  
  
  private loadMeal(id: number): void {
    this.mealsService.getMealById(id).subscribe((data: Meals) => {
      this.mealData = data; 
      this.selectedType = this.types.find(type => type.id === data.type?.id) || null;
      this.setSelectedType();
    });
  }
  private loadTypes(): void {
    this.typeService.getAllTypes().subscribe(
      (types) => {
        this.types = types;
      },
      (error) => {
        console.error('Error loading types:', error);
      }
    );
  }
  private setSelectedType(): void {
    if (this.mealData.type && this.types) {
      this.selectedType = this.types.find((type) => type.id === this.mealData.type?.id) || null;
    }
  }
  onFileImageClick(): void {
    const fileInput: HTMLInputElement | null = this.imageInputRef.nativeElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  

  onFileSelected(event: any) {
    const file: File | null = event.target.files[0];
    if (file) {
      this.image = file;
      this.imgUrl = file.name;
      const selectedImageElement: HTMLImageElement = this.selectedImage.nativeElement;
      selectedImageElement.src = this.getObjectURL(this.image);
    }
  }
  

  getObjectURL(file: File | null): string {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  }


  
  editMeal(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString !== null ? +idString : NaN;
  
    const isFormValid =
      this.selectedType !== null &&
      this.mealData.name.trim() !== '' &&
      this.mealData.ingredients.trim() !== '' &&
      this.mealData.recipe.trim() !== '';
  
    isFormValid
      ? (() => {
          this.mealData.type = this.selectedType;
          this.mealData.imgUrl = this.imgUrl;
          this.mealsService.updateMeal(id, this.mealData).subscribe(
            () => {
              this.router.navigate(['/admin']);
            },
            (error) => {
              console.error('Error adding meal:', error);
            }
          );
        })()
      : alert('Por favor, complete todos los campos.');
  }
  

}