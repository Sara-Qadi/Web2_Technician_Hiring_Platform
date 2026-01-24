import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { NotificationDropdownComponent } from '../../../notification/notification-dropdown/notification-dropdown.component';
import { ProfileModalService } from '../../../../services/profile-modal.service';
import { ProfileService } from '../../../../services/profile.service';
import { catchError, filter, of } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NotificationDropdownComponent],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent implements OnInit {
  role: number = 0;
  dropdownOpen = false;
  userId: number | null = null;
  loggedIn: boolean = false;
  profileImageUrl: string = '';
  unreadCount: number = 0;

  isInProfilePage: boolean = false;

  username: string = '';

  adminDropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private profileModalService: ProfileModalService,
    private profileService: ProfileService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.isLoggedIn();

    if (this.loggedIn) {
      this.loadUserRole();
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateProfileRouteStatus();
        this.adminDropdownOpen = false;
      });

    this.updateProfileRouteStatus();
  }

  @HostListener('document:click')
  closeAdminDropdown() {
    this.adminDropdownOpen = false;
  }

  handleUserClick(event: MouseEvent) {
    event.stopPropagation();

    if (this.role === 1) {
      this.adminDropdownOpen = !this.adminDropdownOpen;
      return;
    }

    this.openProfileOrLogin();
  }

  updateProfileRouteStatus() {
    const url = this.router.url;

    this.isInProfilePage =
      url.startsWith('/jobowner/') ||
      url.startsWith('/technician/profile/') ||
      url.includes('/profile');
  }

  loadUserRole() {
    this.profileService.getProfile()
      .pipe(catchError(error => {
        console.error('Failed to fetch profile', error);
        return of(null);
      }))
      .subscribe(profile => {
        if (profile && profile.user_id) {
          this.profileService.getUserById(profile.user_id)
            .pipe(catchError(error => {
              console.error('Failed to fetch user by ID', error);
              return of(null);
            }))
            .subscribe(user => {
              if (user) {
                this.role = user.role_id;
                this.userId = user.user_id;

                this.username = user.user_name || 'User';

                if (this.userId !== null) {
                  this.loadUnreadNotifications(this.userId);
                }

                if (this.role === 1) {
                  this.profileImageUrl = 'assets/person1.jpg';
                } else {
                  this.profileService.getProfileByUserId(user.user_id).subscribe({
                    next: (profile) => {
                      this.profileImageUrl = 'http://localhost:8000/storage/' + profile.photo;
                    },
                    error: () => {
                      this.profileImageUrl = 'assets/person1.jpg';
                    }
                  });
                }
              }
            });
        }
      });
  }

  loadUnreadNotifications(userId: number) {
    this.notificationService.getUnreadNotifications(userId).subscribe({
      next: (notifications) => this.unreadCount = notifications.length,
      error: () => this.unreadCount = 0
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openProfileOrLogin() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if ((this.role === 2 || this.role === 3) && this.userId !== null) {
      this.router.navigate(['/jobowner', this.userId]);
      return;
    }

    console.log("Admin doesn't have profile page.");
  }
}
