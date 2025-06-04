import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

import { Jobpost } from '../../../models/jobpost.model';

@Component({
  selector: 'app-edit-job',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css'],
  standalone: true,
  imports: [NavbarAdminComponent,FooterAdminComponent,ReactiveFormsModule]
})
export class EditJobComponent implements OnInit {

  addJobForm!: FormGroup;
  jobId!: number;
  dataService = inject(JobDataService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.addJobForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      minimum_budget: ['', Validators.required],
      maximum_budget: ['', Validators.required],
      location: ['', Validators.required],
      deadline: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });

    // قراءة ID من الراوتر
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];
      this.loadJobData(this.jobId);
    });
  }

  loadJobData(id: number): void {
    this.dataService.getthisjobpost(id).subscribe((job: Jobpost) => {
      this.addJobForm.patchValue({
        title: job.title,
        category: job.category,
        minimum_budget: job.minimum_budget,
        maximum_budget: job.maximum_budget,
        location: job.location,
        deadline: job.deadline,
        description: job.description
      });
    });
  }

  onUpdate(): void {
    if (this.addJobForm.invalid) {
      this.addJobForm.markAllAsTouched();
      return;
    }

    const updatedJob: Jobpost = {
      jobpost_id: this.jobId,
      title: this.addJobForm.value.title,
      category: this.addJobForm.value.category,
      minimum_budget: this.addJobForm.value.minimum_budget,
      maximum_budget: this.addJobForm.value.maximum_budget,
      location: this.addJobForm.value.location,
      deadline: this.addJobForm.value.deadline,
      description: this.addJobForm.value.description,
      status: this.addJobForm.value.status || 'pending', // or set appropriate default/status
      user_id: this.addJobForm.value.user_id || 0, // replace 0 with actual user id if available
      user_name: this.addJobForm.value.user_name || '' // replace '' with actual user name if available
    };

    const formData = new FormData();
    Object.entries(updatedJob).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    this.dataService.updatethisjobpost(this.jobId, formData).subscribe(() => {
      alert('Job updated successfully!');
      this.dataService.getthisjobpost(this.jobId).subscribe((job: Jobpost) => {
      const userId = job.user_id;
      this.router.navigate(['/jobowner', userId]);
    });
    });
  }

  cancelEdit(): void {
    this.dataService.getthisjobpost(this.jobId).subscribe((job: Jobpost) => {
      const userId = job.user_id;
      this.router.navigate(['/jobowner', userId]);
    });
  }
}
