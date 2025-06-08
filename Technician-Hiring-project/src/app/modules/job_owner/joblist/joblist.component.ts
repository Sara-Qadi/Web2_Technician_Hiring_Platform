import { Component, inject, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';
import { JobblockComponent } from '../jobblock/jobblock.component';
import { CommonModule } from '@angular/common';
import { AddjobComponent } from '../addjob/addjob.component';
import { ActivatedRoute, NavigationEnd, Router,RouterLink } from '@angular/router';
import { Jobpost } from '../../../models/jobpost.model';
import { filter } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';

declare var bootstrap: any;
@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [JobblockComponent,CommonModule,AddjobComponent],
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css'],
})
export class JobListComponent implements OnInit {

  constructor(private jobpostservice:JobDataService,private profileser:ProfileService,private route: ActivatedRoute) { }
  roleId!: number;
  @Input() userId!: number;
  jobsarray: Jobpost[] = [];

  ngOnInit(): void {
  this.profileser.getroleid(this.userId).subscribe((roleid: number) => {
    this.roleId =roleid;
    console.log('User Role ID:', this.roleId);
  });
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.loadJobs(this.userId);
    }
  }

  loadJobs(userId: number) {
    this.jobpostservice.getjobownerjobposts(userId).subscribe({
      next: (data) => this.jobsarray = data,
      error: (err) => console.error('فشل في تحميل الوظائف:', err)
    });
  }
  showPopup = false;
  selectedJobIdToDelete: number | null = null;

getalljobs(userId: number) {
  this.jobpostservice.getjobownerjobposts(userId).subscribe(posts => {
    this.jobsarray = posts;  
    console.log(this.jobsarray);
});
}
 
  
  router = inject(Router);
 
  deleteIndex: number | null = null;



requestEdit(job: Jobpost) {
  this.router.navigate(['/updatejob'], { state: { userId: this.userId, data: job } });
}

  requestDelete(jobpost_id: number)
  {
    this.showPopup = true;
    this.selectedJobIdToDelete =jobpost_id;
  }
  confirmDelete(){
    if(this.selectedJobIdToDelete!==null){
      this.jobpostservice.deletethisjobpost(this.selectedJobIdToDelete).subscribe(()=>{
        this.jobsarray = this.jobsarray.filter(job => job.jobpost_id !== this.selectedJobIdToDelete);
      });
      (document.activeElement as HTMLElement)?.blur();

      // إغلاق المودال باستخدام Bootstrap
      const modalEl = document.getElementById('deleteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl!);
      modalInstance?.hide();
    }
  }

  
  
}
