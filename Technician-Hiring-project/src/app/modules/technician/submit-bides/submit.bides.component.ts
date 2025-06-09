import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { JobdetailsComponent } from '../../job_owner/jobdetails/jobdetails.component';
import { JobDataService } from '../../../services/jobdata.service';
import { ProposalService } from '../../../services/proposal.service';
import { Proposal } from '../../../models/proposal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-submit-bides',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarAdminComponent, FooterAdminComponent, JobdetailsComponent],
  templateUrl: './submit.bides.component.html',
  styleUrls: ['./submit.bides.component.css']
})
export class SubmitBidesComponent implements OnInit {

  job: any;
  Price: number | null = null;
  comment: string = '';
  showForm = false;
  maxJobPrice: number | null = null;
  minJobPrice: number | null = null;

  constructor(
    private jobDataService: JobDataService,
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.jobDataService.getthisjobpost(id).subscribe({
        next: (res) => {
          this.job = res;
          this.maxJobPrice = this.job.maximum_budget;
          this.minJobPrice = this.job.minimum_budget;
          console.log('✅ Job loaded:', this.job);
        },
        error: (err) => {
          console.error('❌ Error loading job:', err);
        }
      });
    } else {
      console.error('❌ Invalid job ID in URL');
    }
  }

  checkAmount(value: number): void {
  if (this.minJobPrice != null && this.maxJobPrice != null) {
    if (value < this.minJobPrice || value > this.maxJobPrice) {
      this.Price = null;
    }
  }
}


  toggleApply() {
    this.showForm = true;
  }

  submitForm() {
    if (!this.job || !this.job.jobpost_id) {
      console.error('Job is null or missing jobpost_id');
      return;
    }

    const proposalData: Proposal = {
      id: 0, // or omit if not needed
      price: this.Price ?? 0,
      status_agreed: 'pending',
      description_proposal: this.comment,
      tech_id: 15,  // TODO: dynamically get current technician ID
      jobpost_id: this.job.jobpost_id
    };

    this.proposalService.addProposal(proposalData,proposalData.jobpost_id).subscribe({
      next: (res) => {
        console.log('✅ koko wawa :', proposalData , proposalData.jobpost_id);
        console.log('✅ Proposal submitted:', res);

        const notification = {
          user_id: 9,
          type: 'proposal',
          message: ` submitted a bid for your job.`,
          read_status: 'unread'
        };

        this.notificationService.sendNotification(notification).subscribe({
          next: () => console.log('🔔 Notification sent'),
          error: (err) => console.error('❌ Failed to send notification', err)
        });

        alert('Proposal submitted successfully!');
        this.Price = null;
        this.comment = '';
        this.showForm = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('❌ Error submitting proposal:', err);
      }
    });
  }

}
