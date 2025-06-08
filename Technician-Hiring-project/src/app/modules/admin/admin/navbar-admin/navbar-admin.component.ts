import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {NgIf} from '@angular/common';
import { NotificationDropdownComponent } from '../../../notification/notification-dropdown/notification-dropdown.component';
import { ProfileModalService } from '../../../../services/profile-modal.service';
import { ProfileService } from '../../../../services/profile.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NotificationDropdownComponent
  ],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent implements OnInit {
  role: number = 0;
  dropdownOpen = false;
  userId: number | null = null;

  constructor(
    private router: Router,
    private profileModalService: ProfileModalService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadUserRole();
  }

  loadUserRole() {
  this.profileService.getProfile()
    .pipe(
      catchError(error => {
        console.error('Failed to fetch profile', error);
        return of(null);
      })
    )
    .subscribe(profile => {
      if (profile && profile.user_id) {
        this.profileService.getUserById(profile.user_id)
          .pipe(
            catchError(error => {
              console.error('Failed to fetch user by ID', error);
              return of(null);
            })
          )
          .subscribe(user => {
            if (user) {
              this.role = user.role_id;
              this.userId = user.user_id;
              console.log('User ID:', this.userId);
              console.log('User role:', this.role);
            }
          });
      } else {
        console.warn('Profile does not contain user_id');
      }
    });
}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
   openProfileOrLogin() {
    if (this.isLoggedIn()) {
      this.profileModalService.openModal();
    } else {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

