import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {

  private jobsList: any[] = [];  // ليست للجوبس اللي رح ادخلهم لما اعمل بوست من الفورم
  private selectedJob: any=null;

  constructor(private http: HttpClient) {
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
    return this.http.get<any>('http://127.0.0.1:8000/api/jobpost/allposts');
  }

  // في حال بدي اضيف جوب جديدة
  addJob(job: any) 
  {
    this.jobsList.push(job);
  } 

  // جيتر عشان ارجع داتا الجوبس كلها ز حسب الاندكس بختار الجوب اللي بدي اياه
  getJobs() 
  {
    return this.jobsList;
  }

  //في حال بدي احذف جوبس من الاراي اللي عندي
  removeJob(index: number) 
  {
    this.jobsList.splice(index, 1);  
  }

  //في حال بدي اعدل على الداتا لجوب معينة اول شي بدور على هاي الكارد و اخزن البيانات الجديدة عليها
  updateJob(oldJob: any, newJob: any) 
  {
    const index = this.jobsList.findIndex(job => job.jobTitle === oldJob.jobTitle);
    if (index !== -1) 
      {
        this.jobsList[index] = newJob;
      }
  }
  // تخزين الجوب المختارة لعرض التفاصيل
  setSelectedJob(job: any) {
    this.selectedJob = job;
  }

  // استرجاع الجوب المختارة
  getSelectedJob() {
    return this.selectedJob;
  }

  
}
