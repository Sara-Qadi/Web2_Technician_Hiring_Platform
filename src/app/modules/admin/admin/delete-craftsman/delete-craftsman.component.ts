import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { AdminService } from '../../../../services/admin/admin.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../footer-admin/footer-admin.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-delete-craftsman',
  standalone: true,
  templateUrl: './delete-craftsman.component.html',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NavbarAdminComponent,
    FooterAdminComponent,
    NgIf,
    RouterLink,
  ],
  styleUrls: ['./delete-craftsman.component.css']
})
export class DeleteCraftsmanComponent implements OnInit {
  searchQuery: string = '';
  users: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers(this.searchQuery).subscribe({
      next: (users) => {
        this.users = users;
        console.log('Fetched users:', users);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load users.';
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.fetchUsers();
  }

  deleteUser(user_id: number): void {
    if (!user_id) {
      alert('Invalid user ID');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(user_id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.user_id !== user_id);
          alert('User deleted successfully');
        },
        error: () => {
          alert('Failed to delete user.');
        }
      });
    }
  }

  getAvatar(name: string): string {
    if (!name) return '';
    const parts = name.split(' ');
    const first = parts[0].charAt(0);
    let second = '';
    if (parts[1] && isNaN(+parts[1])) {
      second = parts[1].charAt(0);
    }
    return first + second;
  }

}
