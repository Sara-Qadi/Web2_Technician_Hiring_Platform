import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProposalService } from '../../../services/proposal.service';
import { JobDataService } from '../../../services/jobdata.service';
import { Jobpost } from '../../../models/jobpost.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobsummary',
  imports: [RouterLink, CommonModule],
  templateUrl: './jobsummary.component.html',
  styleUrl: './jobsummary.component.css'
})
export class JobsummaryComponent implements OnInit {
  constructor(public router:Router,private route:ActivatedRoute,private propservice:ProposalService,private jobdateservice:JobDataService){}
  jobid!:number;
  bidsnumber!:number;
  @Input() jobinfo!: Jobpost;
  ngOnInit(): void {
    if (!this.jobinfo) {
    this.route.paramMap.subscribe(params => {
          this.jobid = Number(params.get('id')) || 0;
        });
        this.propservice.countjobproposals(this.jobid).subscribe((bids: number) => {
          this.bidsnumber = bids;
        });
        this.jobdateservice.getthisjobpost(this.jobid).subscribe({
        next: (res) => {
          this.jobinfo = res;
          console.log('✅ Job loaded:', this.jobinfo);
        },
        error: (err) => {
          console.error('❌ Error loading job:', err);
        }
      });
  }
}
}
