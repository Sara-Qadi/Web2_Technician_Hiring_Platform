import { Component, inject, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';
import { JobblockComponent } from '../jobblock/jobblock.component';
import { CommonModule } from '@angular/common';
import { AddjobComponent } from '../addjob/addjob.component';
import { ActivatedRoute, NavigationEnd, Router,RouterLink } from '@angular/router';
import { Jobpost } from '../../../models/jobpost.model';
import { filter } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';

declare var bootstrap: any;
@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [JobblockComponent,CommonModule,AddjobComponent],
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css'],
})
export class JobListComponent implements OnInit {

  constructor(private jobpostservice:JobDataService,private profileser:ProfileService,private route: ActivatedRoute) { }
  roleId!: number;
  @Input() userId!: number;
  jobsarray: Jobpost[] = [];

  ngOnInit(): void {
  this.profileser.getroleid(this.userId).subscribe((roleid: number) => {
    this.roleId =roleid;
    console.log('User Role ID:', this.roleId);
  });
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.loadJobs(this.userId);
    }
  }

  loadJobs(userId: number) {
    this.jobpostservice.getjobownerjobposts(userId).subscribe({
      next: (data) => this.jobsarray = data,
      error: (err) => console.error('فشل في تحميل الوظائف:', err)
    });
  }
  showPopup = false;
  selectedJobIdToDelete: number | null = null;


  //userId!: number;

  



  


getalljobs(userId: number) {
  this.jobpostservice.getjobownerjobposts(userId).subscribe(posts => {
    this.jobsarray = posts;  
    console.log(this.jobsarray);
});
}
  
  deletejob(){

  }
  /********** */
  /*
  delete(id:Number,index:any){
    console.log(id);
    this.jobpostservice.deletethisjobpost(id).subscribe(posts=>{
      console.log(posts);
      this.jobsarray.splice(index,1);
    })
  }*/
  /*JOBS = [
    {
      jobTitle: 'Fix Kitchen Sink',
      category: 'Plumber',
      location: 'Asira al-Shamaliya',
      minBudget: 100,
      maxBudget: 200,
      jobDescription: 'The kitchen sink is leaking and needs urgent repair.',
      attachments: [
        'https://example.com/uploads/sink-leak.jpg',
        'https://example.com/uploads/sink-invoice.pdf'
      ],
      deadline: '2025-04-20'
    },
    {
      jobTitle: 'Paint Living Room',
      category: 'Painter',
      location: 'Nablus',
      minBudget: 300,
      maxBudget: 500,
      jobDescription: 'Need to paint a 6x6m living room. Light colors only.',
      attachments: [],
      deadline: '2025-04-25'
    },
    {
      jobTitle: 'Install New Light Fixtures',
      category: 'Electrician',
      location: 'Ramallah',
      minBudget: 150,
      maxBudget: 250,
      jobDescription: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      attachments: ['https://example.com/uploads/light-layout.pdf'],
      deadline: '2025-04-22'
    }
  ];*/
  router = inject(Router);
  //اول شي بدي اجيب الداتا من السيرفس عشان اعمل عمليات حذف او تعديل وهيك
  //جبت السيرفس و عملتله انجكت
 // private dataService = inject(JobDataService);
  //selectedJob: any = null;
  role="jobowner";
  //جبت الجوبس كلهم و خزنتهم هون
  //jobs = this.dataService.getJobs();
  //فلاغ عشان الديليت بوب اب
  //يا نل يا رقم
  deleteIndex: number | null = null;

  // لما اكبس على الايكون تاعت الابديت بجيب الداتا تبعت هاي الكارد عشان اعدل عليها


requestEdit(job: Jobpost) {
  this.router.navigate(['/updatejob'], { state: { userId: this.userId, data: job } });
}

  // لما اكبس على الايقونة تبعت الديليت بخلي الفلاغ ترو عشان تظهر البوب اب و بخزن رقم الاندكس في حال اكدت على عملية الحذف
  requestDelete(jobpost_id: number)
  {
    this.showPopup = true;
    this.selectedJobIdToDelete =jobpost_id;
    //this.deleteIndex = index;
  }
  confirmDelete(){
    if(this.selectedJobIdToDelete!==null){
      this.jobpostservice.deletethisjobpost(this.selectedJobIdToDelete).subscribe(()=>{
        this.jobsarray = this.jobsarray.filter(job => job.jobpost_id !== this.selectedJobIdToDelete);
      });
      (document.activeElement as HTMLElement)?.blur();

      // إغلاق المودال باستخدام Bootstrap
      const modalEl = document.getElementById('deleteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl!);
      modalInstance?.hide();
    }
  }

  /*confirmDelete() {
  if (this.selectedJobIdToDelete !== null && this.deleteIndex !== null) {
    this.delete(this.selectedJobIdToDelete,this.deleteIndex);
  }
}

  openDeleteModal(jobId: number) {
  ;
}
  // بحدث الجوبس سواء بعد ما حذفت او عدلت عليهم
  refreshJobs()
  {
   //this.jobs = this.dataService.getJobs();
    this.jobpostservice.getjobposts().subscribe(posts => {
    this.jobsp = posts;
  });
  }

  // لما اكبس على ديليت تاعت البوب اب بحذف الكارد
  confirmDelete() {
    console.log('Deleting job ID:', this.selectedJobIdToDelete);
  if (this.selectedJobIdToDelete !== null) {
    this.jobpostservice.deletethisjobpost(this.selectedJobIdToDelete).subscribe({
      next: () => {
        this.showPopup = false; // إخفاء البوب أب بعد الحذف
        this.selectedJobIdToDelete = null;
        this.refreshJobs();     // تحديث القائمة
      },
      error: (err) => {
        console.error('Error deleting job post:', err);
        // ممكن تضيفي alert أو رسالة خطأ
      }
    });
  }
}

    // بعد ما عدلت على الداتا و كبست ابديت
  jobUpdated(newJob: any)
  {
    // البيانات الجديدة بتحل محل القديمة
    //this.dataService.updateJob(this.selectedJob, newJob);
    //this.selectedJob = null;
    //this.refreshJobs();  // حدثت الجوبس بعد ما عدلت عليهم
  }*/
  
}
