import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AdminService } from '../../../../services/admin/admin.service';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../footer-admin/footer-admin.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NgIf, FormsModule, NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId!: number;
  user: any = {};
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('user_id'));
    this.loadUser();
  }

  loadUser(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        const targetUser = users.find((u: any) => u.user_id === this.userId);
        if (targetUser) {
          this.user = { ...targetUser };
        } else {
          this.errorMessage = 'User not found';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load user.';
      }
    });
  }

  updateUser(): void {
    const updatedData: any = {
      user_name: this.user.user_name,
      email: this.user.email,
      phone: this.user.phone,
      country: this.user.country,
      role_id: this.user.role_id,
    };

    if (this.password.trim() !== '') {
      updatedData.password = this.password;
    }

    this.adminService.updateUser(this.userId, updatedData).subscribe({
      next: () => {
        this.successMessage = 'User updated successfully!';
        setTimeout(() => this.router.navigate(['/admin/delete-craftsman']), 1500);
      },
      error: () => {
        this.errorMessage = 'Failed to update user.';
      }
    });
  }
}
