import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Types } from '../models/Types.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private baseUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<Types[]> {
    return this.http.get<Types[]>(`${this.baseUrl}/types`);
  }

  getTypeById(id: number): Observable<Types> {
    return this.http.get<Types>(`${this.baseUrl}/types/${id}`);
  }

}
