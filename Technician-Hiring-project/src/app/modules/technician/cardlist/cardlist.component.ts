import { Component, inject , Input, OnInit } from '@angular/core';

import { CardblockComponent } from '../cardblock/cardblock.component';
import { CommonModule } from '@angular/common';
import { JobblockComponent } from '../../job_owner/jobblock/jobblock.component';
import { JobDataService } from '../../../services/jobdata.service';//lian
import { Jobpost } from '../../../models/jobpost.model';



@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [CardblockComponent,CommonModule,JobblockComponent],
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css'],
})
export class CardListComponent implements OnInit {
  jobarray: Jobpost[] = [];
  

  constructor(private jobpostService: JobDataService) {}

  ngOnInit(): void {
    this.jobpostService.getjobpostsfortech().subscribe({
      next: (data) => {
        this.jobarray = data;
        console.log('Received job posts:', data);
        this.mergeJobs()
      },
      error: (err) => {
        console.error('Error fetching job posts:', err);
      }
    });
  }
  //role="technician";
  //اول شي بدي اجيب الداتا من السيرفس عشان اعمل عمليات حذف او تعديل وهيك
  //جبت السيرفس و عملتله انجكت

  private dataService = inject(JobDataService);

 // private dataService = inject(DataService);  //omar
   private ldataService = inject(JobDataService);//lian

  selectedJob: any = null;

  //جبت الجوبس كلهم و خزنتهم هون
  @Input() jobs: Jobpost[] = [];

  mergeJobs() {
  const merged: Jobpost[] = [];

  for (const job of this.jobs) {
    const match = this.jobarray.find(j => j.jobpost_id === job.jobpost_id);
    
    if (match) {
      merged.push(job);
    }
  }

  

  this.jobs = merged;

  console.log('Merged jobs:', this.jobs);
}

    //فلاغ عشان الديليت بوب اب
  showPopup = false;
  //يا نل يا رقم
  deleteIndex: number | null = null;

  // لما اكبس على الايكون تاعت الابديت بجيب الداتا تبعت هاي الكارد عشان اعدل عليها
  requestEdit(index: number)
  {
    this.selectedJob = { ...this.jobs[index] };  // تخزين نسخة من الوظيفة للتعديل
  }

  // لما اكبس على الايقونة تبعت الديليت بخلي الفلاغ ترو عشان تظهر البوب اب و بخزن رقم الاندكس في حال اكدت على عملية الحذف
  requestDelete(index: number)
  {
    this.showPopup = true;
    this.deleteIndex = index;
  }

  // بحدث الجوبس سواء بعد ما حذفت او عدلت عليهم
  refreshJobs()
  {

   //this.jobs = this.dataService.getJobs();

   //this.jobs = this.dataService.getJobs();  //omar
    //this.jobs = this.ldataService.getJobs(); //lian

  }

  // لما اكبس على ديليت تاعت البوب اب بحذف الكارد
  confirmDelete()
  {
    if (this.deleteIndex !== null)
      {
       // this.dataService.removeJob(this.deleteIndex); //omar
        //this.ldataService.removeJob(this.deleteIndex); //lian
        this.showPopup = false;//رجعناها فولس عشان خلصنا حذف
        this.deleteIndex = null;
        this.refreshJobs();  // عشان احدث الجوبس
      }
  }

    // بعد ما عدلت على الداتا و كبست ابديت
  jobUpdated(newJob: any) {
    //this.ldataService.updateJob(this.selectedJob, newJob);
    this.selectedJob = null;
    this.refreshJobs();
  }
  onStatusChange(index: number, newStatus: string) {
    this.jobs[index].status = newStatus;
  }

}
