import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Decision } from '../models/decision.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {
  private apiUrl = 'http://localhost:5000/api/decisions';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // Only add Authorization header if token exists
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  createDecision(decision: Partial<Decision>): Observable<Decision> {
    return this.http.post<Decision>(this.apiUrl, decision, {
      headers: this.getHeaders()
    });
  }

  getDecisions(): Observable<Decision[]> {
    return this.http.get<Decision[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getDecision(id: string): Observable<Decision> {
    return this.http.get<Decision>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateOutcome(id: string, outcomeData: any): Observable<Decision> {
    return this.http.put<Decision>(`${this.apiUrl}/${id}/outcome`, outcomeData, {
      headers: this.getHeaders()
    });
  }

  deleteDecision(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  analyzeDecision(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/analyze`, {}, {
      headers: this.getHeaders()
    });
  }
}