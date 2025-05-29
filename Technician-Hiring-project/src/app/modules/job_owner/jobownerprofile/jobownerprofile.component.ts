import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { JobListComponent } from '../joblist/joblist.component';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

@Component({
  selector: 'app-jobownerprofile',
  standalone: true,
  imports: [
    CommonModule,
    JobListComponent,
    UserdetailsComponent,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './jobownerprofile.component.html',
  styleUrl: './jobownerprofile.component.css'
})
export class JobownerprofileComponent implements OnInit {
  userId!: number;
  //userId: number = 0;
  jobs: any[] = []; // Array to hold job posts for the user
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobpostservice: JobDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id')) || 0;
    });
    this.loadUserJobs(this.userId);
  }

  loadUserJobs(userId: number) {
  this.jobpostservice.getjobownerjobposts(userId).subscribe((jobs) => {
    this.jobs = jobs;
  });
}
  addJob() {
    this.router.navigate(['/postjob'], { state: { userId: this.userId } });
  }
}
