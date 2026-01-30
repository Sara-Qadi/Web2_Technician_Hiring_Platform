import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobDataService } from '../../../services/jobdata.service';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { ProfileService } from '../../../services/profile.service';
import { ProposalService } from '../../../services/proposal.service';
import { ToastService } from '../../../services/toast.service';
import { ReportsService } from '../../../services/report-user.service';

@Component({
  selector: 'app-jobdetails',
  standalone: true,
  imports: [
    CommonModule,
    NavbarAdminComponent,
    FooterAdminComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent implements OnInit {

  job: any;
  attachments: string[] = [];

  reportReason: string = '';
  reportDescription: string = '';

  loading = false;

  @Input() showButtons = true;
  @Input() showTitle = true;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(JobDataService);
  private profileService = inject(ProfileService);
  private proposalService = inject(ProposalService);
  private toast = inject(ToastService);
  private reportsService = inject(ReportsService); // ✅ الحل هون

  ngOnInit() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.dataService.getthisjobpost(id).subscribe({
        next: (res) => {
          this.job = res;
          this.attachments = this.job.attachments;
          this.loading = false;
          console.log('Job loaded:', this.job);
        },
        error: (err) => {
          console.error('Error loading job:', err);
          this.loading = false;
        }
      });
    }
  }

  gotosubmitbid() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.profileService.getUser().subscribe({
      next: (res) => {
        this.proposalService
          .checkIfUserValidateToSubmitBids(res.user_id, id)
          .subscribe({
            next: (response: any) => {
              if (response.canSubmit) {
                this.router.navigate(['/submit-bid', this.job.jobpost_id]);
              } else {
                this.toast.show(
                  'You have already submitted a proposal for this job.',
                  'warning'
                );
              }
            },
            error: (err) => {
              console.error('Error validating user for bid:', err);
            }
          });
      },
      error: (err) => {
        console.error('Error loading user:', err);
      }
    });
  }

confirmReport() {
  const payload = {
    jobpost_id: this.job?.jobpost_id || null,
    reported_user_id: this.job?.user_id || null,
    reason: this.reportReason,
    report_type: 'user',
  };

  console.log('Report payload:', payload);

  this.reportsService.storeReport(payload).subscribe({
    next: () => {
      this.reportReason = '';
      this.reportDescription = '';
      this.toast.show('Report submitted successfully', 'success');
    },
    error: (err) => {
      console.error('Error submitting report:', err);
      this.toast.show('Failed to submit report', 'danger');
    }
  });
}

}
