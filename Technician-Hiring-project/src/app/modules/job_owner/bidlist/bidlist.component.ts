import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidcardComponent } from '../bidcard/bidcard.component';
import { JobsummaryComponent } from '../jobsummary/jobsummary.component';
import { RouterLink,Router, ActivatedRoute } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { Proposal } from '../../../models/proposal.model';
import { ProposalService } from '../../../services/proposal.service';

@Component({
  selector: 'app-bidlist',
  imports: [BidcardComponent,CommonModule,JobsummaryComponent,RouterLink, NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './bidlist.component.html',
  styleUrl: './bidlist.component.css'
})
export class BidlistComponent implements OnInit {
  constructor(private router:Router,private propservice: ProposalService,private route:ActivatedRoute){}
 
  @Input() bidarray:Proposal[]=[]; 
  jobid!:number ;
  loading= false;
  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.jobid = Number(params.get('id')) || 0;
    });
    this.propservice.showjobproposals(this.jobid).subscribe((bids: Proposal[]) => {
      this.bidarray = bids;
      this.loading = false; 
  });
    }

  loadProposals() {
  this.propservice.showjobproposals(this.jobid).subscribe({
    next: (bids: Proposal[]) => {
      this.bidarray = bids;
    },
    error: err => {
      console.error('خطأ أثناء تحميل العروض:', err);
    }
  });
}
}
