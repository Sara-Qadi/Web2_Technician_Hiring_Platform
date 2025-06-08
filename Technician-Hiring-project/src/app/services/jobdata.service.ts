import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Jobpost } from '../models/jobpost.model';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {



  constructor(private http: HttpClient){}
    
  
  getjobposts():Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/allposts');
  }
  /*getjobownerjobposts(userid:Number):Observable<Jobpost[]>{
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
  }*/

  getjobownerjobposts(userid: Number): Observable<Jobpost[]> {
  return this.http.get<Jobpost[]>(`http://127.0.0.1:8000/api/jobpost/showuserposts/${userid}`);
}

addjobpost(data: FormData): Observable<any> {
  return this.http.post('http://127.0.0.1:8000/api/jobpost/addpost', data);
}

getthisjobpost(id: Number): Observable<Jobpost> {
  return this.http.get<Jobpost>(`http://127.0.0.1:8000/api/jobpost/showpost/${id}`);
}

updatethisjobpost(id: Number, jp: FormData): Observable<any> {
  return this.http.put<any>(`http://127.0.0.1:8000/api/jobpost/updatepost/${id}`, jp);
}

deletethisjobpost(id: Number): Observable<any> {
  return this.http.delete(`http://127.0.0.1:8000/api/jobpost/deletepost/${id}`);
}

countjobposts(): Observable<number> {
  return this.http.get<number>('http://127.0.0.1:8000/api/jobpost/countposts');
}
  getjobpostsfortech():Observable<Jobpost[]>{
  return this.http.get<Jobpost[]>('http://127.0.0.1:8000/api/jobpost/allPostsforTech');
  }
  updatestatus(id:Number){
    return this.http.put(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/updatestatus/${id}`,{});
  }
  private userId: number | null = null;

  setUserId(id: number) { this.userId = id; }
  getUserId() { return this.userId; }

 // private selectedJob: Jobpost | null = null;

  /*setSelectedJob(job: Jobpost) {
    this.selectedJob = job;
  }

  getSelectedJob(): Jobpost | null {
    return this.selectedJob;
  }*/

    //sara
   private apiUrl = 'http://localhost:8000/api';
getCompletedJobs(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/completed-jobs`);
}


}
