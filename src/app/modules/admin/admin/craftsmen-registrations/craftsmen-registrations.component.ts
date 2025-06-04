import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NavbarAdminComponent} from '../navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from '../footer-admin/footer-admin.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-craftsmen-registrations',
  imports: [
    NgForOf,
    NavbarAdminComponent,
    FooterAdminComponent,
    FormsModule
  ],
  templateUrl: './craftsmen-registrations.component.html',
  styleUrl: './craftsmen-registrations.component.css'
})
export class CraftsmenRegistrationsComponent {
  searchQuery: string = ''; //  متغير البحث

  registrations = [
    { id: 1, contact: '456-7890 / johndhill.gmail.com', date: '20/10/2023', status: 'Pending' },
    { id: 2, contact: '456-7891 / rallen.gmail.com', date: '21/10/2023', status: 'Pending' },
    { id: 3, contact: '456-7892 / sgoldson.gmail.com', date: '22/10/2023', status: 'Pending' },
    { id: 4, contact: '456-7893 / cf.gmail.com', date: '23/10/2023', status: 'Pending' },
    { id: 5, contact: '456-7894 / te.gmail.com', date: '24/10/2023', status: 'Pending' },
  ];

  approveRegistration(id: number): void {
    const confirmApprove = window.confirm('Are you sure you want to approve this registration?');
    if (confirmApprove) {
      const reg = this.registrations.find(r => r.id === id);
      if (reg) reg.status = 'Approved';
    }
  }

  rejectRegistration(id: number): void {
    const confirmReject = window.confirm('Are you sure you want to reject this registration?');
    if (confirmReject) {
      const reg = this.registrations.find(r => r.id === id);
      if (reg) reg.status = 'Rejected';
    }
  }
  get filteredRegistrations() {
    const query = this.searchQuery.toLowerCase();
    return this.registrations.filter(reg =>
      reg.contact.toLowerCase().includes(query) ||
      reg.date.toLowerCase().includes(query) ||
      reg.status.toLowerCase().includes(query) ||
      reg.id.toString().includes(query)
    );
  }
}
