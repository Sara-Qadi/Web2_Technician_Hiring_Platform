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
      'Authorization': `Bearer ${token}`,
    });
  }
  getJobCompletion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/completion`);
  }

  getEarnings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/earnings`);
  }

  getTopRated(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-rated`);
  }

  getLowPerformance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/low-performance`);
  }

  getMonthlyActivity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly-activity`);
  }

  getTopFinishers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-job-finishers`);
  }

  getLocationDemand(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location-demand`);

  }
   exportAllReports(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export-all-reports`, {
      responseType: 'blob'
    });
  }
}
