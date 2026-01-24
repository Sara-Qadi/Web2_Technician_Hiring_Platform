import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ReportsService {
  private apiUrl = 'http://127.0.0.1:8000/api/reports'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getJobCompletion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/completion`, {
      headers: this.getAuthHeaders()
    });
  }

  getEarnings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/earnings`, {
      headers: this.getAuthHeaders()
    });
  }

  getTopRated(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-rated`, {
      headers: this.getAuthHeaders()
    });
  }

  getLowPerformance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/low-performance`, {
      headers: this.getAuthHeaders()
    });
  }

  getMonthlyActivity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly-activity`, {
      headers: this.getAuthHeaders()
    });
  }

  getTopFinishers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-job-finishers`, {
      headers: this.getAuthHeaders()
    });
  }

  getLocationDemand(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location-demand`, {
      headers: this.getAuthHeaders()
    });
  }

  exportAllReports(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export-all-reports`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    });
  }
}
