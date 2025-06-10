import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jobpost } from '../models/jobpost.model';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

  getjobposts(): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/jobpost/allposts`);
  }

  getjobownerjobposts(userid: number): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/jobpost/showuserposts/${userid}`);
  }

  addjobpost(data: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/jobpost/addpost`, data, { headers });
  }

  getthisjobpost(id: number): Observable<Jobpost> {
    return this.http.get<Jobpost>(`${this.baseUrl}/jobpost/showpost/${id}`).pipe(
      map(job => ({
        ...job,
        attachments: typeof job.attachments === 'string'
          ? JSON.parse(job.attachments)
          : job.attachments
      }))
    );
  }

  updatethisjobpost(id: number, jp: FormData): Observable<Jobpost> {
    const headers = this.getAuthHeaders();
    jp.append('_method', 'PUT');
    return this.http.post<Jobpost>(`${this.baseUrl}/jobpost/updatepost/${id}`, jp, { headers });
  }

  deletethisjobpost(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/jobpost/deletepost/${id}`, { headers });
  }

  countjobposts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/jobpost/countposts`);
  }

  getjobpostsfortech(): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/jobpost/allPostsforTech`);
  }

  getPendingJobposts(id: number): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/jobpost/pending/${id}`);
  }

  getonProgressJobposts(id: number): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/jobpost/onprogress/${id}`);
  }

  getCompletedJobposts(id: number): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/jobpost/completed/${id}`);
  }

  updatestatus(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/jobpost/updatestatus/${id}`, {});
  }

  filterJobs(searchInput: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/jobpost/filterJobs/${searchInput}`);
  }

  getCompletedJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/completed-jobs`);
  }

  setUserId(id: number) {
    this.userId = id;
  }

  getUserId(): number | null {
    return this.userId;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getJobownerIdBytheJobpostId(jobpostId: any) {
  return this.http.get(`${this.baseUrl}/jobpost/getJobownerIdBytheJobpostId/${jobpostId}`);
}

  getTechIdBytheJobpostId(Jobpost_id: any) {
    return this.http.get(`${this.baseUrl}/jobpost/getTechIdBytheJobpostId/${Jobpost_id}`);
  }

}
