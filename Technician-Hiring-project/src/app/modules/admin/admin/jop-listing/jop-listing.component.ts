import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NavbarAdminComponent} from '../navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from '../footer-admin/footer-admin.component';
import { JobListComponent } from '../../../job_owner/joblist/joblist.component';

@Component({
  selector: 'app-jop-listing',
  templateUrl: './jop-listing.component.html',
  imports: [
    NgForOf,
    NavbarAdminComponent,
    FooterAdminComponent,
    JobListComponent
  ],
  styleUrls: ['./jop-listing.component.css']
})
export class JopListingComponent {
  /*jobs = [
    {
      title: 'Blacksmith',
      image: 'assets/blacksmith.jpg',
      description: 'Expert in metal works including forging, welding and repair.'
    },
    {
      title: 'Carpenter',
      image: 'assets/Carpenter.jpg',
      description: 'Experienced in wood construction and furniture making.'
    },
    {
      title: 'Potter',
      image: 'assets/potter.jpg',
      description: 'Specialist in creating pottery and ceramic art pieces.'
    },
    {
      title: 'Painter',
      image: 'assets/Painter.jpg',
      description: 'Detail-oriented house and decorative painter.'
    },
    {
      title: 'Glassblower',
      image: 'assets/Glassblower.jpg',
      description: 'Crafts intricate glass products using traditional techniques.'
    },
    {
      title: 'Electrical Technician',
      image: 'assets/Electrical Technician.jpg',
      description: 'Skilled in wiring, repair, and installation of electrical systems.'
    }
  ];*/
  
}
