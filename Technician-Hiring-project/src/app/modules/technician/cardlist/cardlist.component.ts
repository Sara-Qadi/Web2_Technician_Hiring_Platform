import { Component, inject , Input } from '@angular/core';

import { DataService } from '../../../services/data.service';

import { CardblockComponent } from '../cardblock/cardblock.component';
import { CommonModule } from '@angular/common';
import { JobblockComponent } from '../../job_owner/jobblock/jobblock.component';
import { JobDataService } from '../../../services/jobdata.service';//lian



@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [CardblockComponent,CommonModule,JobblockComponent],
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css'],
})
export class CardListComponent {
  role="technician";
  //اول شي بدي اجيب الداتا من السيرفس عشان اعمل عمليات حذف او تعديل وهيك
  //جبت السيرفس و عملتله انجكت

  private dataService = inject(DataService);

 // private dataService = inject(DataService);  //omar
   private ldataService = inject(JobDataService);//lian

  selectedJob: any = null;

  //جبت الجوبس كلهم و خزنتهم هون
  @Input() jobs: any[] = [];
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

   //this.jobs = this.dataService.getJobs();  //omar
    this.jobs = this.ldataService.getJobs(); //lian

  }

  // لما اكبس على ديليت تاعت البوب اب بحذف الكارد
  confirmDelete()
  {
    if (this.deleteIndex !== null)
      {
        //this.dataService.removeJob(this.deleteIndex); //omar
        this.ldataService.removeJob(this.deleteIndex); //lian
        this.showPopup = false;//رجعناها فولس عشان خلصنا حذف
        this.deleteIndex = null;
        this.refreshJobs();  // عشان احدث الجوبس
      }
  }

    // بعد ما عدلت على الداتا و كبست ابديت
  jobUpdated(newJob: any)
  {
    // البيانات الجديدة بتحل محل القديمة
    //this.dataService.updateJob(this.selectedJob, newJob); //omar
    this.ldataService.updateJob(this.selectedJob, newJob); //lian
    this.selectedJob = null;
    this.refreshJobs();  // حدثت الجوبس بعد ما عدلت عليهم
  }
  onStatusChange(index: number, newStatus: string) {
    this.jobs[index].status = newStatus;
  }

}
