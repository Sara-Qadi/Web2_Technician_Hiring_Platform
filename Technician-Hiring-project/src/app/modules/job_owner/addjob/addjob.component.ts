import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

@Component({
  selector: 'app-addjob',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './addjob.component.html',
  styleUrl: './addjob.component.css'
})
export class AddjobComponent implements OnInit {
  jobId?: number;
  userId: number = 0;
  selectedFile: File | null = null;

  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    minimum_budget: new FormControl(0, [Validators.required, Validators.min(1)]),
    maximum_budget: new FormControl(100, [Validators.required, Validators.min(1)]),
    location: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
    //attachments: new FormControl<File[]>([])
  });

  constructor(
    private router: Router,
    private jobService: JobDataService,
    private route: ActivatedRoute
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.userId = state?.['userId'] || 0;
    const jobData = state?.['data'];
    if (jobData) {
      this.jobId = jobData.jobpost_id;
      this.addJobForm.patchValue({
        title: jobData.title,
        category: jobData.category,
        minimum_budget: jobData.minimum_budget,
        maximum_budget: jobData.maximum_budget,
        location: jobData.location,
        description: jobData.description,
        deadline: jobData.deadline
      });
    }
  }

  ngOnInit(): void {
    if (this.jobId) {
      this.jobService.getthisjobpost(this.jobId).subscribe({
        next: (job) => {
          this.addJobForm.patchValue({
            title: job.title,
            category: job.category,
            minimum_budget: job.minimum_budget,
            maximum_budget: job.maximum_budget,
            location: job.location,
            description: job.description,
            deadline: job.deadline
          });
        },
        error: () => alert('error loading job data')
      });
    }
  }

  onSubmit() {
    if (this.addJobForm.invalid) {
      this.addJobForm.markAllAsTouched();
      return;
    }
    const minBudget = this.addJobForm.value.minimum_budget ?? 0;
  const maxBudget = this.addJobForm.value.maximum_budget ?? 0;
  const deadline = new Date(this.addJobForm.value.deadline ?? '');
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
    if (minBudget > maxBudget) {
    alert('Minimum budget cannot be greater than maximum budget');
    return;
  }

  // التحقق من التاريخ
  if (deadline < today) {
    alert('deadline must be after todat');
    return;
  }

    const formData = this.buildFormData();

    if (this.jobId) {
      this.jobService.getthisjobpost(this.jobId).subscribe({
        next: (job) => {
          this.addJobForm.patchValue({
            title: job.title,
            category: job.category,
            minimum_budget: job.minimum_budget,
            maximum_budget: job.maximum_budget,
            location: job.location,
            description: job.description,
            deadline: job.deadline
          });
          console.log('Job data loaded:', job);
        },
        error: () => alert('error loading job data')
      });
      this.jobService.updatethisjobpost(this.jobId, formData).subscribe({
        next: () => {
          console.log(formData);
          alert("JOBPOST UPDATED SUCCESSFULLY!!");
          this.router.navigate(['/jobowner', this.userId]);
        },
        error: (err) => {
          if (err.status === 403 && err.error?.message === 'Unauthorized') {
            console.error('Unauthorized: Only jobowners and admins can update jobposts.');
            alert('Only jobowners and admins are allowed to update jobposts.');
          } else {
            console.error('Error adding jobpost:', err);
          }
        }
      });
    } else {
      this.jobService.addjobpost(formData).subscribe({
        next: () => {
          alert("JOBPOST ADDED SUCCESSFULLY!!");
          this.router.navigate(['/jobowner', this.userId]);
        },
        error: (err) => {
          if (err.status === 403 && err.error?.message === 'Unauthorized') {
            console.error('Unauthorized: Only jobowners can add jobposts.');
            alert('Only jobowners are allowed to add jobposts.');
          } else {
            console.error('Error adding jobpost:', err);
          }
        }
      });
    }
  }

  buildFormData(): FormData {
    const formData = new FormData();
    const form = this.addJobForm.value;

    formData.append('title', form.title ?? '');
    formData.append('category', form.category ?? '');
    formData.append('minimum_budget', String(form.minimum_budget ?? 0));
    formData.append('maximum_budget', String(form.maximum_budget ?? 0));
    formData.append('location', form.location ?? '');
    formData.append('description', form.description ?? '');
    formData.append('deadline', form.deadline ?? '');
    formData.append('user_id', String(this.userId));

   if (this.selectedFile) {
  formData.append('attachments', this.selectedFile);
}

    return formData;
  }

  onFileChange(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
    console.log('Selected files:', this.selectedFile);
  }
}

  cancelEdit() {
    this.router.navigate(['/jobowner', this.userId]);
  }

  private getDefaultDeadline(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
