import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobDataService {

  private jobsList: any[] = [];  // ليست للجوبس اللي رح ادخلهم لما اعمل بوست من الفورم

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
}
