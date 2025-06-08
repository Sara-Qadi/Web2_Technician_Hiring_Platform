import { Component, OnInit } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { RouterModule } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';


@Component({
  selector: 'app-complete-jobs',
  templateUrl: './complete-jobs.component.html',
  styleUrls: ['./complete-jobs.component.css'],
    providers: [DatePipe],
     imports: [
    CommonModule, RouterModule,     NavbarAdminComponent,
        FooterAdminComponent
  ]
})
export class CompleteJobsComponent implements OnInit {
  completedJobs: any[] = [];

  constructor(private JobDataService: JobDataService) {}

  ngOnInit(): void {
    this.JobDataService.getCompletedJobs().subscribe({
      next: (data) => {
        this.completedJobs = data;
      },
      error: (err) => {
        console.error('Failed to fetch completed jobs', err);
      }
    });
  }
}
