import { Component, Input,Output,EventEmitter,OnChanges, SimpleChanges,inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
@Component({
  selector: 'app-jobblock',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './jobblock.component.html',
  styleUrls: ['./jobblock.component.css']
})
export class JobblockComponent {
  constructor(private router:Router){}
  private jobService = inject(JobDataService);
  selectedJob: any = null;
  //عملت متغير مؤقتا عشان اشوف شكل الكارد للجوب اونر و للارتيزن
  @Input() role:string | undefined;
  //عشان استقبل الداتا من الكارد ليست
  @Input() job: any;
  //لما اليوزر او الجوب اونر يكبس على الايكونز الموجودة عالكارد عشان توصل للكارد ليست
  @Output() deleteRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<void>(); // أضف حدث التعديل

  //للفايل(بدي اشتغل عليه مرة ثانية)
  extractFileName(url: string): string {
    return url.split('/').pop() || 'Attachment';
  }

  //ارسل الايفنت اللي صار للكارد ليست
  onEditClick()
  {
  this.editRequest.emit();  
  }

  onDeleteClick() 
  {
    this.deleteRequest.emit();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      // سيتم تحديث البيانات المعروضة على الكارد عندما تتغير
      this.job = changes['job'].currentValue;
    }
  }
  
  //شكل الكارد للجوباونر
  jobowner()
  {
    this.role='jobowner';
  }
  //شكل الكارد للارتيزن
  artisan()
  {
    this.role='artisan';
  }

  toreview(){
    this.router.navigate(['/reviewbids']);
  }
  toupdate(){
    this.router.navigate(['/updatejob']);
  }
  goToDetails() {
    this.jobService.setSelectedJob(this.job);  // احفظ الجوب في الخدمة
    this.router.navigate(['/jobdetails']);       // انتقل للصفحة
    localStorage.setItem('selectedJob', JSON.stringify(this.job));//عشان تضل حتى لما اعمل ريفرش
    }
}
