import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from '../../services/Meals.service'; 
import { TypeService } from '../../services/Types.service'; 
import { Meals } from '../../models/Meals.model'; 
import { Types } from '../../models/Types.model';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {
  types: Types[] = [];
  selectedType: Types | null = null;
  mealData: Meals = {
    name: '',
    type: null,
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTypes();
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


  
  addMeal(): void {
    const isFormValid =
      this.selectedType !== null &&
      this.mealData.name.trim() !== '' &&
      this.mealData.ingredients.trim() !== '' &&
      this.mealData.recipe.trim() !== '';
  
    isFormValid
      ? (() => {
          this.mealData.type = this.selectedType;
          this.mealData.imgUrl = this.imgUrl;
          this.mealsService.saveMeal(this.mealData).subscribe(
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
