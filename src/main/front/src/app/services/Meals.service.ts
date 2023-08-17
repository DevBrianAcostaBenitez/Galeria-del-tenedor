import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meals } from '../models/Meals.model';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAllMeals(): Observable<Meals[]> {
    return this.http.get<Meals[]>(`${this.baseUrl}/meals`);
  }

  getMealById(id: number): Observable<Meals> {
    return this.http.get<Meals>(`${this.baseUrl}/meals/${id}`);
  }

  saveMeal(meal: Meals): Observable<Meals> {
    return this.http.post<Meals>(`${this.baseUrl}/meals`, meal);
  }

  updateMeal(id: number, meal: Meals): Observable<Meals> {
    return this.http.put<Meals>(`${this.baseUrl}/meals/${id}`, meal);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/meals/${id}`);
  }
}
