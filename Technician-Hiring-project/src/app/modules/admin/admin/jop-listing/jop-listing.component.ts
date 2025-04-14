import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NavbarAdminComponent} from '../navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from '../footer-admin/footer-admin.component';

@Component({
  selector: 'app-jop-listing',
  templateUrl: './jop-listing.component.html',
  imports: [
    NgForOf,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  styleUrls: ['./jop-listing.component.css']
})
export class JopListingComponent {
  jobs = [
    {
      title: 'Blacksmith',
      imageUrl: 'https://via.placeholder.com/300x180',
      description: 'Expert in metal works including forging, welding and repair.'
    },
    {
      title: 'Carpenter',
      imageUrl: 'https://via.placeholder.com/300x180',
      description: 'Experienced in wood construction and furniture making.'
    },
    {
      title: 'Potter',
      imageUrl: 'https://via.placeholder.com/300x180',
      description: 'Specialist in creating pottery and ceramic art pieces.'
    },
    {
      title: 'Painter',
      imageUrl: 'https://via.placeholder.com/300x180',
      description: 'Detail-oriented house and decorative painter.'
    },
    {
      title: 'Glassblower',
      imageUrl: 'https://via.placeholder.com/300x180',
      description: 'Crafts intricate glass products using traditional techniques.'
    },
    {
      title: 'Electrical Technician',
      imageUrl: 'https://via.placeholder.com/300x180',
      description: 'Skilled in wiring, repair, and installation of electrical systems.'
    }
  ];
}
