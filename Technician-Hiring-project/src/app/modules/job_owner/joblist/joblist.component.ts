import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';
import { JobblockComponent } from '../jobblock/jobblock.component';
import { CommonModule } from '@angular/common';
import { AddjobComponent } from '../addjob/addjob.component';
import { Router } from '@angular/router';
import { Jobpost } from '../../../models/jobpost.model';
import { ProfileService } from '../../../services/profile.service';
declare var bootstrap: any;

@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [JobblockComponent, CommonModule, AddjobComponent],
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css'],
})
export class JobListComponent implements OnInit {
  constructor(
    private jobpostservice: JobDataService,
    private profileser: ProfileService
  ) {}

  roleId!: number;
  @Input() userId!: number;    
  @Input() status!: string;

  jobsarray: Jobpost[] = [];
  loading = false;
  currentUserId!: number;

  router = inject(Router);

  ngOnInit(): void {
    this.loading = true;

    this.profileser.getUser().subscribe({
      next: (user) => {
        this.currentUserId = user.user_id;

        this.profileser.getroleid(this.userId).subscribe({
          next: (roleid: number) => {
            this.roleId = roleid;
            this.loading = false;

            if (this.userId && this.status) {
              this.loadJobsByStatus(this.status);
            }
          },
          error: (err) => {
            console.error('failed getting role id', err);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('error loading user', error);
        this.loading = false;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['userId'] && this.userId) || (changes['status'] && this.status)) {
      this.loadJobsByStatus(this.status);
    }
  }

  loadJobsByStatus(status: string) {
    if (!this.userId) return;

    if (this.roleId === 3) {
      this.jobpostservice.getCompletedJobsForTechnician(this.userId).subscribe({
        next: (jobs) => this.jobsarray = jobs,
        error: (err) => console.error('failed loading technician completed jobs', err),
      });
      return;
    }

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
    if (!job) console.warn(`Job with ID ${jobId} not found in jobsarray.`);
  }

  showPopup = false;
  selectedJobIdToDelete: number | null = null;

  requestEdit(job: Jobpost) {
    this.router.navigate(['/updatejob'], { state: { userId: this.userId, data: job } });
  }

  requestDelete(jobpost_id: number) {
    this.showPopup = true;
    this.selectedJobIdToDelete = jobpost_id;
  }

  confirmDelete() {
    if (this.selectedJobIdToDelete !== null) {
      this.jobpostservice.deletethisjobpost(this.selectedJobIdToDelete).subscribe(() => {
        this.jobsarray = this.jobsarray.filter(job => job.jobpost_id !== this.selectedJobIdToDelete);
      });

      (document.activeElement as HTMLElement)?.blur();
      const modalEl = document.getElementById('deleteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl!);
      modalInstance?.hide();
    }
  }
}
