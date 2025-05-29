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
  /*bids = [
    {
      bidname:"Lian",
      amount: 950,
      rate:4.8,
      completejobs:50,
      memberdate:"5/7/2025",
      proposal: 'I have extensive experience in blah blah blah...'
    },
    {
      bidname:"Ahmad",
      amount: 50,
      rate:3.8,
      completejobs:35,
      memberdate:"29/12/2025",
      proposal: 'I have extensive experience in blah blah blah...'
    },
    {
      bidname:"Abd",
      amount: 35,
      rate:4.5,
      completejobs:20,
      memberdate:"17/3/2025",
      proposal: 'I have extensive experience in blah blah blah...'
    }
  ];*/
  @Input() bidarray:Proposal[]=[]; 
  jobid!:number ;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobid = Number(params.get('id')) || 0;
    });
    this.propservice.showjobproposals(this.jobid).subscribe((bids: Proposal[]) => {
      this.bidarray = bids;
  });
    }
  
  /*tojobowner(){
    this.router.navigate(['/jobowner']);
  }*/
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
