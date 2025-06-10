import { Component, Input,Output,EventEmitter,OnChanges, SimpleChanges,inject } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { Jobpost } from '../../../models/jobpost.model'; 
import { ProfileService } from '../../../services/profile.service';
declare var bootstrap: any;
@Component({
  selector: 'app-jobblock',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './jobblock.component.html',
  styleUrls: ['./jobblock.component.css']
})
export class JobblockComponent {
  constructor(private router:Router,private route:ActivatedRoute,private profileservice:ProfileService){}
  private jobService = inject(JobDataService);
  selectedJob: any = null;
  @Output() editJob = new EventEmitter<Jobpost>();
  @Input() role: number | undefined;
  //عملت متغير مؤقتا عشان اشوف شكل الكارد للجوب اونر و للارتيزن
 // @Input() role:string | undefined;
  //عشان استقبل الداتا من الكارد ليست
  @Input() job!: Jobpost;
  @Input() userId!: number;
  //@Input() index: number = 0;
  //لما اليوزر او الجوب اونر يكبس على الايكونز الموجودة عالكارد عشان توصل للكارد ليست
  @Output() deleteRequest = new EventEmitter<number>();
  //@Output() editRequest = new EventEmitter<void>(); // أضف حدث التعديل
  //@Output() editJob = new EventEmitter<Jobpost>();
  //للفايل(بدي اشتغل عليه مرة ثانية)
  extractFileName(url: string): string {
    return url.split('/').pop() || 'Attachment';
  }
  canEdit = false;
  @Input() currentUserId!: number;
  //ارسل الايفنت اللي صار للكارد ليست
 
  ngOnInit(): void {
  this.canEdit = this.job.user_id === this.userId;
  console.log('Current User ID:', this.currentUserId);
  console.log('Job User ID:', this.job.user_id); 
  console.log('Can Edit:', this.canEdit);
}
  onDeleteClick()
  {
    this.deleteRequest.emit(this.job.jobpost_id); // أو job.id حسب التسمية

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      this.job = changes['job'].currentValue;
    }
  }

  openConfirmation() {
    const modal = new bootstrap.Modal(document.getElementById('statusModal'));
    modal.show();
  }

  markAsCompleted() {
    this.jobService.updatestatus(this.job.jobpost_id).subscribe({
      next: (response) => {
        console.log('Job marked as completed:', response);
        alert('Job marked as completed successfully!');
      },
      error: (error) => {
        console.error('Error marking job as completed:', error);
        alert('Failed to mark job as completed.');
      }});
    bootstrap.Modal.getInstance(document.getElementById('statusModal'))?.hide();
  }
  toreview(){
    this.router.navigate(['/reviewbids',this.job.jobpost_id]);
  }

 emitEditJob() {
    this.editJob.emit(this.job);
  }
  
goToDetails() {
    if (this.job?.jobpost_id) {
    this.router.navigate(['/jobdetails', this.job.jobpost_id]);
  } else {
    console.error(' لا يمكن الانتقال: jobpost_id غير موجود', this.job);
  }
}
}
