import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf } from '@angular/common';
import {NavbarAdminComponent} from '../navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from '../footer-admin/footer-admin.component';

@Component({
  selector: 'app-delete-craftsman',
  templateUrl: './delete-craftsman.component.html',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  styleUrls: ['./delete-craftsman.component.css']
})
export class DeleteCraftsmanComponent {
  searchQuery: string = '';
  craftsmen = [
    { id: 1, jobTitle: 'Carpenter', name: 'Ahmad', location: 'Nablus', createdDate: new Date('2025-02-22') },
    { id: 2, jobTitle: 'Blacksmith', name: 'Ali', location: 'Tulkarm', createdDate: new Date('2025-02-22') },
    { id: 3, jobTitle: 'Painter', name: 'Mohammad', location: 'Nablus', createdDate: new Date('2025-02-26') },
    { id: 4, jobTitle: 'Glassblower', name: 'Hamza', location: 'Hebron', createdDate: new Date('2025-03-01') },
    { id: 5, jobTitle: 'Electrical Technician', name: 'Omar', location: 'Jenin', createdDate: new Date('2025-03-04') },
    { id: 6, jobTitle: 'Potter', name: 'Abed', location: 'Qalqilia', createdDate: new Date('2025-03-15') },
    { id: 7, jobTitle: 'Potter', name: 'Ahmad', location: 'Ramallah', createdDate: new Date('2025-03-15') }
  ];
}
