import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  acceptproposal(id: number): Observable<Proposal> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Proposal>(`${this.baseUrl}/submission/accept/${id}`, {}, { headers });
  }

  rejectproposal(id: number): Observable<Proposal> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Proposal>(`${this.baseUrl}/submission/reject/${id}`, {}, { headers });
  }
}
