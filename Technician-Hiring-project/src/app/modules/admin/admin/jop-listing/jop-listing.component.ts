import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { FooterAdminComponent } from '../footer-admin/footer-admin.component';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { AdminService } from '../../../../services/admin/admin.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-jop-listing',
  templateUrl: './jop-listing.component.html',
  imports: [
    DatePipe,
    FooterAdminComponent,
    NavbarAdminComponent,
    NgIf,
    NgForOf,
    FormsModule,
  ],
  styleUrls: ['./jop-listing.component.css']
})
export class JopListingComponent implements OnInit {
  jobs: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.adminService.getAllJobPosts(this.searchTerm).subscribe({
      next: (res) => {
        if (res.success) {
          this.jobs = res.data;
        } else {
          this.errorMessage = 'Failed to load job postings.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'An error occurred while loading job posts.';
        this.loading = false;
      }
    });
  }

  onDelete(jobId: number) {
    if (confirm('Are you sure you want to delete this job posting?')) {
      this.adminService.deleteJobPost(jobId).subscribe({
        next: (res) => {
          if (res.success) {
            this.jobs = this.jobs.filter(job => job.jobpost_id !== jobId);
            alert('Job post deleted successfully.');
          } else {
            alert('Failed to delete job post.');
          }
        },
        error: () => {
          alert('An error occurred while deleting the job post.');
        }
      });
    }
  }

  onSearchChange() {
    this.loadJobs();
  }
}
