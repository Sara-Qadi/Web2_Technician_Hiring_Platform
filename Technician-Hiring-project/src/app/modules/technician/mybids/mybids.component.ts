import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ProposalService } from '../../../services/proposal.service';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { JobsummaryComponent } from '../../job_owner/jobsummary/jobsummary.component';
@Component({
  selector: 'app-mybids',
  imports: [NavbarAdminComponent , FooterAdminComponent, CommonModule , JobsummaryComponent],
  templateUrl: './mybids.component.html',
  styleUrl: './mybids.component.css'
})
export class MybidsComponent implements OnInit {
  constructor(private proposalService: ProposalService, private profileService: ProfileService) {}
  technicianID : number | null = null;
  proposals: any[] | null = null;

  ngOnInit(): void {
    this.profileService.getUser().subscribe({
      next : (res) =>{
        this.technicianID = res.user_id;
        this.proposalService.getAllProposalsForTech(this.technicianID).subscribe({
          next : (res) =>{
            this.proposals = res;
            console.log('koko' , res);
          },
          error : (err) =>{
            console.log(err);
          }
        })
      },
      error : (err) =>{
        console.log(err);
      }
  });
  }

}
