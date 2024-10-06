import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/'; 

  constructor(private http: HttpClient) { }

  register(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Assuming the API returns an array of User
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, data);
  }

  // Add other methods as needed
}
