import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportsService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getAuth(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    });
  }

  getAllReports() {
    return this.http.get<any>(`${this.baseUrl}/reports`, {
      headers: this.getAuth()
    });
  }

 deleteReport(id: number) {
  return this.http.delete(`${this.baseUrl}/reports/${id}`);
}

storeReport(payload: any) {
  return this.http.post('http://localhost:8000/api/reports', payload); // ✅ full backend URL
}

}
