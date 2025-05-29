import { Component, Input,Output,EventEmitter,OnChanges, SimpleChanges,inject } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { Jobpost } from '../../../models/jobpost.model'; 
@Component({
  selector: 'app-jobblock',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './jobblock.component.html',
  styleUrls: ['./jobblock.component.css']
})
export class JobblockComponent {
  constructor(private router:Router,private route:ActivatedRoute){}
  private jobService = inject(JobDataService);
  selectedJob: any = null;
  //@Output() editJob = new EventEmitter<Jobpost>();

  //عملت متغير مؤقتا عشان اشوف شكل الكارد للجوب اونر و للارتيزن
  @Input() role:string | undefined;
  //عشان استقبل الداتا من الكارد ليست
  @Input() job!: Jobpost;
  @Input() userId!: number;
  //@Input() index: number = 0;
  //لما اليوزر او الجوب اونر يكبس على الايكونز الموجودة عالكارد عشان توصل للكارد ليست
  @Output() deleteRequest = new EventEmitter<number>();
  //@Output() editRequest = new EventEmitter<void>(); // أضف حدث التعديل
 @Output() editJob = new EventEmitter<Jobpost>();
  //للفايل(بدي اشتغل عليه مرة ثانية)
  extractFileName(url: string): string {
    return url.split('/').pop() || 'Attachment';
  }

  //ارسل الايفنت اللي صار للكارد ليست
 
  onDeleteClick()
  {
    //this.deleteRequest.emit({ jobId: this.job.id, index: this.job.index });
    this.deleteRequest.emit(this.job.jobpost_id); // أو job.id حسب التسمية

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
    this.router.navigate(['/reviewbids',this.job.jobpost_id]);
  }
  /*toupdate(){
    this.router.navigate(['/updatejob']);
  }
  onEditClick() {
  
}*/
 emitEditJob() {
    this.editJob.emit(this.job);
  }
  /*onEditClick() {
    this.editJob.emit(this.job);
  }*/
goToDetails() {
    this.router.navigate(['/jobdetails', this.job.jobpost_id]); 
}
}
