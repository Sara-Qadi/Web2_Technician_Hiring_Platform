import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NavbarAdminComponent} from '../navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from '../footer-admin/footer-admin.component';

@Component({
  selector: 'app-craftsmen-registrations',
  imports: [
    NgForOf,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './craftsmen-registrations.component.html',
  styleUrl: './craftsmen-registrations.component.css'
})
export class CraftsmenRegistrationsComponent {
  registrations = [
    { id: 1, contact: '456-7890 / johndhill.gmail.com', date: '20/10/2023', status: 'Pending' },
    { id: 2, contact: '456-7891 / rallen.gmail.com', date: '21/10/2023', status: 'Pending' },
    { id: 3, contact: '456-7892 / sgoldson.gmail.com', date: '22/10/2023', status: 'Pending' },
    { id: 4, contact: '456-7893 / cf.gmail.com', date: '23/10/2023', status: 'Pending' },
    { id: 5, contact: '456-7894 / te.gmail.com', date: '24/10/2023', status: 'Pending' },
  ];

}
