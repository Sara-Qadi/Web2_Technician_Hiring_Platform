import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

@Component({
  selector: 'app-complete-jobs',
  templateUrl: './complete-jobs.component.html',
  styleUrls: ['./complete-jobs.component.css'],
    providers: [DatePipe],
     imports: [
    CommonModule, RouterModule,     NavbarAdminComponent,
        FooterAdminComponent
  ]
})
export class CompleteJobsComponent implements OnInit {
  completedJobs = [
    {
      title: 'Fix Office Wiring',
      location: 'Downtown Plaza',
      budget: 250,
      completedAt: new Date('2025-04-21'),
      review: 'Very professional and quick.'
    },
    {
      title: 'Install Ceiling Fan',
      location: 'Rosewood Estate',
      budget: 120,
      completedAt: new Date('2025-03-10'),
      review: ''
    },
       {
      title: 'Install Ceiling Fan',
      location: 'Rosewood Estate',
      budget: 120,
      completedAt: new Date('2025-03-10'),
      review: ''
    },
       {
      title: 'Install Ceiling Fan',
      location: 'Rosewood Estate',
      budget: 120,
      completedAt: new Date('2025-03-10'),
      review: ''
    },
       {
      title: 'Install Ceiling Fan',
      location: 'Rosewood Estate',
      budget: 120,
      completedAt: new Date('2025-03-10'),
      review: ''
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
