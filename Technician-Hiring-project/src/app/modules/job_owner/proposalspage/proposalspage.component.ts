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

@Component({
  selector: 'app-proposalspage',
  imports: [NavbarAdminComponent, FooterAdminComponent,JobsummaryComponent,CommonModule,BidcardComponent],
  templateUrl: './proposalspage.component.html',
  styleUrl: './proposalspage.component.css'
})
export class ProposalspageComponent implements OnInit {
  constructor(private propservice:ProposalService,private route:ActivatedRoute) { }
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
  this.route.params.subscribe(params => {
    const userId = +params['id']; 
    this.propservice.countProposalsforJO(userId).subscribe({
      next: (count) => {
        this.JOproposals = count;
        this.loading = false; 
        console.log('عدد الاقتراحات:', this.JOproposals);
      },
      error: (err) => console.error('فشل في تحميل عدد الاقتراحات:', err)
    });

    this.propservice.getProposalsforJO(userId).subscribe({
      next: (proposals) => {
        console.log('الاقتراحات:', proposals);
        this.bidsarray = proposals;
      },
      error: (err) => console.error('فشل في تحميل الاقتراحات:', err) // ✅ أضيفي error handling هنا أيضًا
    });

    this.propservice.countJobswithProposals(userId).subscribe({
      next: (count) => {
        this.jobnumber = count;
        console.log('عدد الوظائف التي تحتوي على اقتراحات:', count);
      },
      error: (err) => console.error('فشل في تحميل عدد الوظائف:', err) // ✅ أضيفي error handling هنا أيضًا
    });

    this.propservice.getJobswithProposals(userId).subscribe({
      next: (jobs) => {
        this.jobsummaryArray = jobs;
        console.log('الوظائف التي تحتوي على اقتراحات:', this.jobsummaryArray);
      },
      error: (err) => console.error('فشل في تحميل الوظائف التي تحتوي على اقتراحات:', err)
    });

    this.propservice.getPendingProposalsfirJO(userId).subscribe({
      next: (Bids) => {
        this.pendingBids = Bids;
        console.log('الاقتراحات المعلقة:', this.pendingBids);
      },
      error: (err) => console.error('فشل في تحميل الاقتراحات المعلقة:', err)
    });

    this.propservice.getAcceptedProposalsfirJO(userId).subscribe({
      next: (Bids) => {
        this.acceptedBids = Bids;
        console.log('الاقتراحات المعلقة:', this.acceptedBids);
      },
      error: (err) => console.error('فشل في تحميل الاقتراحات المعلقة:', err)
    });
 

  });

}
}
