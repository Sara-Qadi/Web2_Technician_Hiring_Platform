import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../footer-admin/footer-admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-craftsmen-registrations',
  templateUrl: './craftsmen-registrations.component.html',
  standalone: true,
  imports: [
    NavbarAdminComponent,
    NgForOf,
    FooterAdminComponent,
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./craftsmen-registrations.component.css']
})
export class CraftsmenRegistrationsComponent implements OnInit {
  searchQuery: string = '';
  registrations: any[] = [];

  constructor(private adminService: AdminService, public toast: ToastService) {}

  ngOnInit(): void {
    this.loadPendingRegistrations();
  }

  loadPendingRegistrations(): void {
    this.adminService.getPendingTechnicians(this.searchQuery).subscribe({
      next: (response: any) => {
        console.log('Pending registrations response:', response);
        if (response.success) {
          this.registrations = response.data.map((user: any) => ({
            user_id: user.user_id,
            name: user.user_name,
            email: user.email,
            phone: user.phone,
            date: new Date(user.created_at).toLocaleDateString(),
          }));
        } else {
          this.toast.show('Failed to load pending registrations', 'danger');
        }
      },
      error: (error) => {
        console.error('Error fetching technicians', error);
        this.toast.show('Error loading pending registrations', 'danger');
      }
    });
  }


  onSearchChange(): void {
    this.loadPendingRegistrations();
  }

  approveRegistration(user_id: number): void {
    if (window.confirm('Are you sure you want to approve this registration?')) {
      this.adminService.acceptTechnician(user_id).subscribe({
        next: () => {
          this.toast.show('The craftsman has been successfully accepted.', 'success');
          this.loadPendingRegistrations();
        },
        error: (error) => {
          console.error('Error in accepting the technician.', error);
          this.toast.show('Failed to accept the technician.', 'danger');
        }
      });
    }
  }

  rejectRegistration(user_id: number): void {
    if (window.confirm('Are you sure you want to reject this registration?')) {
      this.adminService.rejectTechnician(user_id).subscribe({
        next: () => {
          this.toast.show('The technician was rejected and deleted successfully.', 'success');
          this.loadPendingRegistrations();
        },
        error: (error) => {
          console.error('technician rejection error.', error);
          this.toast.show('Failed to reject the technician.', 'danger');
        }
      });
    }
  }

}
