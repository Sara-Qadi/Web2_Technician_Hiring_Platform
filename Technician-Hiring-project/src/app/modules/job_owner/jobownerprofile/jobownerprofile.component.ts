import { Component } from '@angular/core';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { JobListComponent } from '../joblist/joblist.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';



@Component({
  selector: 'app-jobownerprofile',
  imports: [CommonModule,JobListComponent,UserdetailsComponent,NavbarAdminComponent,FooterAdminComponent],
  templateUrl: './jobownerprofile.component.html',
  styleUrl: './jobownerprofile.component.css'
})
export class JobownerprofileComponent {
  constructor(private router: Router) {}
  
  addJob(){
    this.router.navigate(['/postjob']);
  }
}
