import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { JobdetailsComponent } from '../jobdetails/jobdetails.component';

@Component({
  selector: 'app-job-info-page',
  imports: [NavbarAdminComponent,FooterAdminComponent,JobdetailsComponent],
  templateUrl: './job-info-page.component.html',
  styleUrl: './job-info-page.component.css'
})
export class JobInfoPageComponent {

}
