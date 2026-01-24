import { Component, OnInit } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { RouterModule, Router } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { ProfileService } from '../../../services/profile.service'; 

@Component({
  selector: 'app-complete-jobs',
  templateUrl: './complete-jobs.component.html',
  styleUrls: ['./complete-jobs.component.css'],
  providers: [DatePipe],
  imports: [
    CommonModule,
    RouterModule,
    NavbarAdminComponent,
    FooterAdminComponent
  ]
})
export class CompleteJobsComponent implements OnInit {
  completedJobs: any[] = [];

  constructor(
    private jobDataService: JobDataService,
    private profileService: ProfileService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.jobDataService.getCompletedJobs().subscribe({
    next: (data) => {
      this.completedJobs = data;
    },
    error: (err) => {
      console.error('Failed to fetch completed jobs', err);
    }
  });
}


gotoOwnerProfile(userId: number) {

  if (!userId) {
    console.error('Invalid user ID');
    return;
  }

  this.profileService.getroleid(userId).subscribe({
    next: (roleId) => {
      if (roleId === 2) {
        this.router.navigate(['/jobowner', userId]);
      } else {
        console.warn(`User with ID ${userId} is not a job owner (roleId: ${roleId})`);
      }
    },
    error: (err) => {
      console.error('Failed to get role ID', err);
    }
  });
}

}
