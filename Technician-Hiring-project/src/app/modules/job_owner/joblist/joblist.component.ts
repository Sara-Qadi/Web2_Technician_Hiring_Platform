import { Component, inject } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';
import { JobblockComponent } from '../jobblock/jobblock.component';
import { CommonModule } from '@angular/common';
import { AddjobComponent } from '../addjob/addjob.component';
import { Router,RouterLink } from '@angular/router';


@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [JobblockComponent,CommonModule,AddjobComponent],
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css'],
})
export class JobListComponent {
  JOBS = [
    {
      jobTitle: 'Fix Kitchen Sink',
      category: 'Plumber',
      location: 'Jeddah',
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
      location: 'Riyadh',
      minBudget: 300,
      maxBudget: 500,
      jobDescription: 'Need to paint a 6x6m living room. Light colors only.',
      attachments: [],
      deadline: '2025-04-25'
    },
    {
      jobTitle: 'Install New Light Fixtures',
      category: 'Electrician',
      location: 'Dammam',
      minBudget: 150,
      maxBudget: 250,
      jobDescription: 'Install 4 new ceiling light fixtures.',
      attachments: ['https://example.com/uploads/light-layout.pdf'],
      deadline: '2025-04-22'
    }
  ];
  router = inject(Router);
  //اول شي بدي اجيب الداتا من السيرفس عشان اعمل عمليات حذف او تعديل وهيك
  //جبت السيرفس و عملتله انجكت
  private dataService = inject(JobDataService);
  selectedJob: any = null;
  
  //جبت الجوبس كلهم و خزنتهم هون
  jobs = this.dataService.getJobs();
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
   this.jobs = this.dataService.getJobs();  
  }
  
  // لما اكبس على ديليت تاعت البوب اب بحذف الكارد
  confirmDelete() 
  {
    if (this.deleteIndex !== null) 
      {
        this.dataService.removeJob(this.deleteIndex);
        this.showPopup = false;//رجعناها فولس عشان خلصنا حذف
        this.deleteIndex = null;
        this.refreshJobs();  // عشان احدث الجوبس
      }
  }
  
    // بعد ما عدلت على الداتا و كبست ابديت
  jobUpdated(newJob: any) 
  {
    // البيانات الجديدة بتحل محل القديمة
    this.dataService.updateJob(this.selectedJob, newJob);
    this.selectedJob = null;
    this.refreshJobs();  // حدثت الجوبس بعد ما عدلت عليهم
  }

  
  
}
