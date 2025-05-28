import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Jobpost } from '../models/jobpost.model';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {

//<<<<<<< Updated upstream
  private jobsList: any[] = [];  // ليست للجوبس اللي رح ادخلهم لما اعمل بوست من الفورم
  private selectedJob: any=null;

  constructor(private http: HttpClient){} /*{
    this.loadJobs().subscribe({
      next: (res: any) => {
        this.jobsList = res; 
        console.log('Jobs loaded:', this.jobsList);
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        console.log('error:', this.jobsList);
      }
    });
  }

  loadJobs() {
    return this.http.get<any>('http://127.0.0.1:8000/api/jobpost/all');
  }

  // في حال بدي اضيف جوب جديدة
  addJob(job: any) 
  {
    this.jobsList.push(job);
  } 
=======
  constructor(private http:HttpClient) { }
  private jobpostsChanged = new Subject<void>();
>>>>>>> Stashed changes*/

  //jobpostsChanged$ = this.jobpostsChanged$.asObservable();
  getjobposts():Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/allposts');
  }
  getjobownerjobposts(userid:Number):Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/showuserposts/${userid}`);
  }
  addjobpost(data: FormData):Observable<any>{
    return this.http.post('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/addpost',data);
  }
  getthisjobpost(id:Number):Observable<Jobpost>{
    return this.http.get<Jobpost>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/showpost/${id}`);
  }
  updatethisjobpost(id:Number,jp:FormData):Observable<any>{
    return this.http.put<any>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/updatepost/${id}`,jp);
  }
  deletethisjobpost(id:Number):Observable<any>{
    return this.http.delete(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/deletepost/${id}`);
  }
  countjobposts():Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/countposts');
  }
  getjobpostsfortech():Observable<Jobpost[]>{
    return this.http.get<Jobpost[]>('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/jobpost/allPostsforTech');
  }
  private userId: number | null = null;

  setUserId(id: number) { this.userId = id; }
  getUserId() { return this.userId; }
  
  //private selectedJob: Jobpost | null = null;

  setSelectedJob(job: Jobpost) {
    this.selectedJob = job;
  }

  getSelectedJob(): Jobpost | null {
    return this.selectedJob;
  }

  
}
