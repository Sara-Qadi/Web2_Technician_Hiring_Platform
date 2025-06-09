import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jobpost } from '../models/jobpost.model';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {



  //غconstructor(private http: HttpClient){}
    
  
  getjobposts():Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/allposts');
  }
  getjobownerjobposts(userid:Number):Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/showuserposts/${userid}`);
  }
  addjobpost(data: FormData):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/addpost',data,{ headers });
  }
  getthisjobpost(id:Number):Observable<Jobpost>{
    return this.http.get<Jobpost>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/showpost/${id}`).pipe(
    map(job => ({
      ...job,
      attachments: typeof job.attachments === 'string'
        ? JSON.parse(job.attachments)
        : job.attachments
    }))
  );
  }
  getPendingJobposts(id:number):Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/pending/${id}`);
  }
  getonProgressJobposts(id:number):Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/onprogress/${id}`);
  }
  getCompletedJobposts(id:number):Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/completed/${id}`);
  }

  updatethisjobpost(id:Number,jp:FormData):Observable<Jobpost>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    jp.append('_method', 'PUT');
    return this.http.post<Jobpost>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/updatepost/${id}`,jp, { headers });
  }
  deletethisjobpost(id:Number):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/deletepost/${id}`, { headers });
  } countjobposts():Observable<number>{
    return this.http.get<number>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/countposts');
  }

  /*getjobownerjobposts(userid: Number): Observable<Jobpost[]> {
  return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/showuserposts/${userid}`);
}

addjobpost(data: FormData): Observable<any> {
  return this.http.post('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/addpost', data);
}

getthisjobpost(id: Number): Observable<Jobpost> {
  return this.http.get<Jobpost>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/showpost/${id}`);
}

updatethisjobpost(id: Number, jp: FormData): Observable<any> {
  return this.http.put<any>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/updatepost/${id}`, jp);
}

deletethisjobpost(id: Number): Observable<any> {
  return this.http.delete(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/deletepost/${id}`);
}

countjobposts(): Observable<number> {
  return this.http.get<number>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/countposts');
}*/
  getjobpostsfortech():Observable<Jobpost[]>{
  return this.http.get<Jobpost[]>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/allPostsforTech');
  }
  updatestatus(id:Number){
    return this.http.put(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/updatestatus/${id}`,{});
  }
  private baseUrl = 'http://127.0.0.1:8000/api';
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

  /*getjobposts(): Observable<Jobpost[]> {
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

  updatestatus(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/jobpost/updatestatus/${id}`, {});
  }*/

  setUserId(id: number) {
    this.userId = id;
  }

  getUserId(): number | null {
    return this.userId;
  }

  filterJobs(searchInput: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/jobpost/filterJobs/${searchInput}`);
  }

  // sara
  getCompletedJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/completed-jobs`);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
