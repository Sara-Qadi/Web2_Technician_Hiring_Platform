import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

getTotalPosts(): Observable<{ total_posts: number }> {
  return this.http.get<{ total_posts: number }>(`${this.baseUrl}/dashboard/total-posts`);
}



  getTotalSubmissions(): Observable<{ total_submissions: number }> {
    return this.http.get<{ total_submissions: number }>(`${this.baseUrl}/dashboard/total-submissions`);
  }

  getJobPostsByMonth(): Observable<any> {
  return this.http.get(`${this.baseUrl}/dashboard/jobposts-per-month`);
}

getPendingApprovals(): Observable<number> {
  return this.http.get<{ pending_approvals: number }>(`${this.baseUrl}/users/pending-approvals`)
    .pipe(map(res => res.pending_approvals));
}

getJobStatusCounts(): Observable<{ in_progress: number, completed: number }> {
  return this.http.get<{ in_progress: number, completed: number }>(`${this.baseUrl}/dashboard/job-status-counts`);
}

}
