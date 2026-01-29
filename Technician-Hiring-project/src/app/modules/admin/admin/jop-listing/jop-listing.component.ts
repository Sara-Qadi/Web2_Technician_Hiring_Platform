import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { FooterAdminComponent } from '../footer-admin/footer-admin.component';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { JobblockComponent } from '../../../job_owner/jobblock/jobblock.component';
import { AdminService } from '../../../../services/admin/admin.service';
import { Jobpost } from '../../../../models/jobpost.model';
import {FormsModule} from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';

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
    JobblockComponent
  ],
  styleUrls: ['./jop-listing.component.css']
})
export class JopListingComponent implements OnInit {
  jobs: Jobpost[] = [];
  loading = false;
  errorMessage = '';
  searchTerm = '';
  role = 1;

  showPopup = false;
  selectedJobIdToDelete: number | null = null;

  constructor(
    private adminService: AdminService,
    public toast: ToastService
  ) {}

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

  requestDelete(jobId: number) {
    this.selectedJobIdToDelete = jobId;
    this.showPopup = true;
  }

  cancelDelete() {
    this.showPopup = false;
    this.selectedJobIdToDelete = null;
  }

  confirmDelete() {
    if (!this.selectedJobIdToDelete) return;

    this.adminService.deleteJobPost(this.selectedJobIdToDelete).subscribe({
      next: () => {
        this.toast.show('Job deleted successfully', 'success');
        this.jobs = this.jobs.filter(
          job => job.jobpost_id !== this.selectedJobIdToDelete
        );
        this.cancelDelete();
      },
      error: () => {
        this.toast.show('Failed to delete job', 'danger');
        this.cancelDelete();
      }
    });
  }

  onSearchChange() {
    this.loadJobs();
  }
}
