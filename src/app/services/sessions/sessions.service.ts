import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:8000/'; 

  constructor(private http: HttpClient) { }

  register(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Assuming the API returns an array of User
  }

  createSession(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}sessions`, data);
  }

  getSessions(user_id:any):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}users/${user_id}/chats`); // Assuming the API returns an array of User

  }

  deteteSession(session_id:any):Observable<any>{
    return this.http.delete<any[]>(`${this.apiUrl}session/${session_id}`); // Assuming the API returns an array of User

  }
  // Add other methods as needed
}
