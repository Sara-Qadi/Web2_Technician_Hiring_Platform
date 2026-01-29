import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { ProfileService } from '../../../services/profile.service';
import { ProposalService } from '../../../services/proposal.service';
import { ToastService } from '../../../services/toast.service';
@Component({
  selector: 'app-jobdetails',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent, FooterAdminComponent,RouterLink],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent implements OnInit {
  job: any;
  attachments: string[] = [];
  private route = inject(ActivatedRoute);
  private router=inject(Router);
  private dataService = inject(JobDataService);
  private profileService = inject(ProfileService);
  private proposalService = inject(ProposalService);
  public toast=inject(ToastService);
  @Input() showButtons = true;
  @Input() showTitle = true;
  loading= false;
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
        }
      });
    } else {
      console.error('Invalid job ID in URL');
    }
  }

  gotosubmitbid() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.profileService.getUser().subscribe({
    next: (res) => {
      this.proposalService.checkIfUserValidateToSubmitBids(res.user_id, id).subscribe({
      next: (response: any) => {
        if (response.canSubmit) {
          console.log('User validated to submit bid:', response);
          this.router.navigate(['/submit-bid', this.job.jobpost_id]);
        }
        else {
          this.toast.show('You have already submitted a proposal for this job.', 'warning');
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

}
