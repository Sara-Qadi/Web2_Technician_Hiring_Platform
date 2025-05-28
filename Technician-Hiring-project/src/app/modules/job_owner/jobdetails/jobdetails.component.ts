import { Component,inject,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobdetails',
  imports: [CommonModule,NavbarAdminComponent,FooterAdminComponent],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent {
  job: any;
  private router = inject(Router);
  constructor(private dataService: JobDataService) {}
  @Input() showButtons = true;
  @Input() showTitle = true;
  ngOnInit() {
    //this.job = this.dataService.getSelectedJob();
    console.log('Loaded job:', this.job); // للتأكد من أنه ليس undefined
    const storedJob = localStorage.getItem('selectedJob');
    if (storedJob) {
      this.job = JSON.parse(storedJob);
    }
  }
  gotosubmitbid(){
    this.router.navigate(['/submit-bid']);
  }
 
}
