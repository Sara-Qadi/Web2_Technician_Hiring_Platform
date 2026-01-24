import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ProposalService } from '../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';
import { Jobpost } from '../../../models/jobpost.model';
import { JobsummaryComponent } from '../jobsummary/jobsummary.component';
import { CommonModule } from '@angular/common';
import { Proposal } from '../../../models/proposal.model';
import { BidcardComponent } from '../bidcard/bidcard.component';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-proposalspage',
  imports: [NavbarAdminComponent, FooterAdminComponent,JobsummaryComponent,CommonModule,BidcardComponent],
  templateUrl: './proposalspage.component.html',
  styleUrl: './proposalspage.component.css'
})
export class ProposalspageComponent implements OnInit {
  constructor(private propservice:ProposalService,private route:ActivatedRoute,private profileserv:ProfileService) { }
  JOproposals!: number;
  jobnumber!: number;
  selectedTab: string = 'jobs';

  jobsummaryArray: Jobpost[] = [];
  bidsarray:Proposal[] = [];
  pendingBids: Proposal[] = [];
  acceptedBids: Proposal[] = [];
  loading= false;
  ngOnInit() {
  this.loading = true;
    this.profileserv.getUser().subscribe({
    next: (user) => {
      console.log('Current User:', user);
      const userId = user.user_id;

      this.propservice.countProposalsforJO(userId).subscribe({
        next: (count) => {
          this.JOproposals = count;
          this.loading = false;
        },
        error: (err) => console.error('error in loading number of proposals', err)
      });

      this.propservice.getProposalsforJO(userId).subscribe({
        next: (proposals) => {
          this.bidsarray = proposals;
        },
        error: (err) => console.error('error in loading proposals', err)
      });

      this.propservice.countJobswithProposals(userId).subscribe({
        next: (count) => {
          this.jobnumber = count;
        },
        error: (err) => console.error('error in loading number of jobs with proposals', err)
      });

      this.propservice.getJobswithProposals(userId).subscribe({
        next: (jobs) => {
          this.jobsummaryArray = jobs;
        },
        error: (err) => console.error('error in loading jobs with proposals', err)
      });

      this.propservice.getPendingProposalsfirJO(userId).subscribe({
        next: (Bids) => {
          this.pendingBids = Bids;
        },
        error: (err) => console.error('error loading pending proposals', err)
      });

      this.propservice.getAcceptedProposalsfirJO(userId).subscribe({
        next: (Bids) => {
          this.acceptedBids = Bids;
        },
        error: (err) => console.error('error loading accepted proposals', err)
      });
    },
    error: (err) => {
      this.loading = false;
      console.error('Error fetching user info', err);
    }
  });

}
}
