import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8000/'; 

  constructor(private http: HttpClient) { }


  createChats(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}chats`, data);
  }

  // Add other methods as needed
}
