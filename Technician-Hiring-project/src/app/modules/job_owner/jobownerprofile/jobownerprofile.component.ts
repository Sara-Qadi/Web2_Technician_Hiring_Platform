import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { JobListComponent } from '../joblist/joblist.component';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ProfileService } from '../../../services/profile.service';

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
  currentUserId: number = 0; // Initialize to 0 or a default value
  //userId: number = 0;
  selectedStatus: string = 'all';
  isCurrentUserProfile: boolean = false;
setStatus(status: string) {
  this.selectedStatus = status;
}

  jobs: any[] = []; // Array to hold job posts for the user
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobpostservice: JobDataService,
    private profileser:ProfileService
  ) {}

  ngOnInit(): void {
  

  // 1. أول شيء: خذ الـ userId من الرابط
  this.route.paramMap.subscribe(params => {
    this.userId = Number(params.get('id')) || 0;
    console.log('Profile User ID:', this.userId);

    // 2. بعدها: جيب المستخدم الحالي من السيرفر عن طريق التوكن
    this.profileser.getUser().subscribe(user => {
      this.currentUserId = user.user_id;
      this.isCurrentUserProfile = this.currentUserId === this.userId;
      console.log('Current User ID:', this.currentUserId);

      // 3. الآن عندك الاثنين، احمل الوظائف
      this.loadUserJobs(this.userId);
      
    }, error => {
      console.error('فشل في جلب المستخدم الحالي:', error);
    });
  });
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
