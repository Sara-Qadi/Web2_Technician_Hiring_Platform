import { Component, Input,Output,EventEmitter,OnChanges, SimpleChanges,inject } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { Jobpost } from '../../../models/jobpost.model';
import { ProfileService } from '../../../services/profile.service';
import { ToastService } from '../../../services/toast.service';
declare var bootstrap: any;
@Component({
  selector: 'app-jobblock',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './jobblock.component.html',
  styleUrls: ['./jobblock.component.css']
})
export class JobblockComponent {
  constructor(private router:Router,private route:ActivatedRoute,private profileservice:ProfileService, public toast: ToastService){}
  private jobService = inject(JobDataService);
  selectedJob: any = null;
  @Input() role: number | undefined;
  @Input() job!: Jobpost;
  @Input() userId!: number;
  @Input() currentUserId!: number;

  @Output() editJob = new EventEmitter<Jobpost>();
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() statusChanged = new EventEmitter<number>();

  extractFileName(url: string): string {
    return url.split('/').pop() || 'Attachment';
  }
  canEdit = false;

  ngOnInit(): void {
  this.canEdit = this.job.user_id === this.userId;
  console.log('Current User ID:', this.currentUserId);
  console.log('Job User ID:', this.job.user_id);
  console.log('Current Job ID in this card:', this.job.jobpost_id);
  console.log('Can Edit:', this.canEdit);
}
  onDeleteClick()
  {
    this.deleteRequest.emit(this.job.jobpost_id);
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
     console.log('Job ID before update:', this.job.jobpost_id);
      this.jobService.updatestatus(this.job.jobpost_id).subscribe({
    next: (response) => {
      console.log('Job marked as completed:', response);

      this.job = response.job;

      bootstrap.Modal.getInstance(document.getElementById('statusModal'))?.hide();

      this.toast.show('Job marked as completed successfully!', 'success');
    },
    error: (error) => {
      console.error('Error marking job as completed:', error);
      this.toast.show('Failed to mark job as completed.', 'danger');
    }
  });
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
    console.error('the jov id missing', this.job);
  }
}
}
