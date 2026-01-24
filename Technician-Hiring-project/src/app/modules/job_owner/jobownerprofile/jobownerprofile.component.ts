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
    FooterAdminComponent,
  ],
  templateUrl: './jobownerprofile.component.html',
  styleUrl: './jobownerprofile.component.css',
})
export class JobownerprofileComponent implements OnInit {
  userId!: number;               
  currentUserId: number = 0;
  selectedStatus: string = 'all';
  isCurrentUserProfile: boolean = false;

  roleId: number = 0;
  isTechnicianProfile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobpostservice: JobDataService,
    private profileser: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id')) || 0;

      this.profileser.getUser().subscribe({
        next: (user) => {
          this.currentUserId = user.user_id;
          this.isCurrentUserProfile = this.currentUserId === this.userId;

          this.profileser.getroleid(this.userId).subscribe({
            next: (roleId: number) => {
              this.roleId = roleId;

              this.isTechnicianProfile = (roleId === 3);

              if (this.isTechnicianProfile) {
                this.selectedStatus = 'completed';
              } else {
                this.selectedStatus = 'all';
              }
            },
            error: (err) => console.error('Error getting role id', err),
          });
        },
        error: (err) => console.error('error in loading user', err),
      });
    });
  }

  setStatus(status: string) {
    this.selectedStatus = status;
  }

  addJob() {
    this.router.navigate(['/postjob'], { state: { userId: this.userId } });
  }
}
