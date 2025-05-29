/*import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { JobdetailsComponent } from '../../job_owner/jobdetails/jobdetails.component';
import { JobDataService } from '../../../services/jobdata.service';
import { ProposalService } from '../../../services/proposal.service';

@Component({
  selector: 'app-submit-bides',
  standalone: true,
  imports: [FormsModule , CommonModule, NavbarAdminComponent, FooterAdminComponent,JobdetailsComponent],
  templateUrl: './submit.bides.component.html',
  styleUrls: ['./submit.bides.component.css']
})
export class SubmitBidesComponent implements OnInit {

  constructor(private jobDataService: JobDataService, private proposalService: ProposalService) {}

  showForm = false;
  toggleApply() {
    this.showForm = true;
  }
  job : any;
  Price: number | null = null;
  comment: string = '';

  ngOnInit(): void {
    this.job = this.jobDataService.getSelectedJob();
    if (!this.job || !this.job.jobpost_id) {
      console.error('Job data is missing or invalid');
    }
  }

  submitForm() {
  if (!this.job || !this.job.jobpost_id) {
    console.error('❌ job is null or missing jobpost_id');
    return;
  }

  const proposalData = {
    price: this.Price,
    status_agreed: false,
    description_proposal: this.comment,
    tech_id: '3',
    jobpost_id: this.job.jobpost_id
  };

  this.proposalService.addProposal(proposalData).subscribe({
    next: (res) => {
      console.log('✅ Proposal submitted:', res);
      this.Price = null;
      this.comment = '';
      this.showForm = false;
    },
    error: (err) => {
      console.error('❌ Error submitting proposal:', err);
    }
  });
}

    
}

*/
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

@Component({
  selector: 'app-submit-bides',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarAdminComponent, FooterAdminComponent, JobdetailsComponent],
  templateUrl: './submit.bides.component.html',
  styleUrls: ['./submit.bides.component.css']
})
export class SubmitBidesComponent implements OnInit {

  constructor(private jobDataService: JobDataService, private proposalService: ProposalService,private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.jobDataService.getthisjobpost(id).subscribe({
        next: (res) => {
          this.job = res;
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
  
  showForm = false;
  toggleApply() {
    this.showForm = true;
  }

  job: any;
  Price: number | null = null;
  comment: string = '';

  /*ngOnInit(): void {
    this.job = this.jobDataService.getSelectedJob();
    if (!this.job || !this.job.jobpost_id) {
      console.error('❌ Job data is missing or invalid');
    }
  }*/

  submitForm() {
    if (!this.job || !this.job.jobpost_id) {
      console.error('Job is null or missing jobpost_id');
      return;
    }

    const proposalData: Proposal = {
      id:0,
      price: this.Price ?? 0,
      status_agreed: false,
      description_proposal: this.comment,
      tech_id: 3, // ممكن تغييره لاحقًا بحسب المستخدم الحالي
      jobpost_id: this.job.jobpost_id
    };

    this.proposalService.addProposal(proposalData).subscribe({
      next: (res) => {
        console.log('✅ Proposal submitted:', res);
        alert("proposal submited yay");
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