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
  @Input() status!: string ;
  jobsarray: Jobpost[] = [];
  loading = false;
  currentUserId!: number;
  ngOnInit(): void {
  this.loading = true;

  this.profileser.getUser().subscribe(user => {
    this.currentUserId = user.user_id;
    console.log('Current User ID:', this.currentUserId);

    this.profileser.getroleid(this.userId).subscribe((roleid: number) => {
      this.roleId = roleid;
      console.log('User Role ID:', this.roleId);
      this.loading = false;

      if (this.userId && this.status) {
        this.loadJobsByStatus(this.status);
      }
    });
  }, error => {
    console.error('فشل في جلب المستخدم الحالي:', error);
    this.loading = false;
  });
}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['userId'] && this.userId) || (changes['status'] && this.status)) {
    this.loadJobsByStatus(this.status);
  }
  }

  loadJobs(userId: number) {
    this.jobpostservice.getjobownerjobposts(userId).subscribe({
      next: (data) => this.jobsarray = data,
      error: (err) => console.error('failed in loading the jobs', err)
    });
  }
 loadJobsByStatus(status: string) {
  if (!this.userId) return;
    switch (status) {
      case 'all':
        this.jobpostservice.getjobownerjobposts(this.userId).subscribe(jobs => this.jobsarray = jobs);
        break;
      case 'pending':
        this.jobpostservice.getPendingJobposts(this.userId).subscribe(jobs => this.jobsarray = jobs);
        break;
      case 'in progress':
        this.jobpostservice.getonProgressJobposts(this.userId).subscribe(jobs => this.jobsarray = jobs);
        break;
      case 'completed':
        this.jobpostservice.getCompletedJobposts(this.userId).subscribe(jobs => this.jobsarray = jobs);
        break;
    }
  }
  onStatusChanged(jobId: number) {
  const job = this.jobsarray.find(j => j.jobpost_id === jobId);
  if (job) {
    //job.status = 'completed';  
    console.log(`Job with ID ${jobId} status updated locally.`);
  } else {
    console.warn(`Job with ID ${jobId} not found in jobsarray.`);
  }
}
  showPopup = false;
  selectedJobIdToDelete: number | null = null;

getalljobs(userId: number) {
  this.jobpostservice.getjobownerjobposts(userId).subscribe(posts => {
    this.jobsarray = posts;  
    console.log(this.jobsarray);
});
}
 
  
  router = inject(Router);
 
  deleteIndex: number | null = null;



requestEdit(job: Jobpost) {
  this.router.navigate(['/updatejob'], { state: { userId: this.userId, data: job } });
}

  requestDelete(jobpost_id: number)
  {
    this.showPopup = true;
    this.selectedJobIdToDelete =jobpost_id;
  }
  confirmDelete(){
    if(this.selectedJobIdToDelete!==null){
      this.jobpostservice.deletethisjobpost(this.selectedJobIdToDelete).subscribe(()=>{
        this.jobsarray = this.jobsarray.filter(job => job.jobpost_id !== this.selectedJobIdToDelete);
      });
      (document.activeElement as HTMLElement)?.blur();

      const modalEl = document.getElementById('deleteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl!);
      modalInstance?.hide();
    }
  }

  
  
}
