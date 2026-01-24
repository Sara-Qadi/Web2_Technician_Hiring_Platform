import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { NotificationDropdownComponent } from '../../../notification/notification-dropdown/notification-dropdown.component';
import { ProfileModalService } from '../../../../services/profile-modal.service';
import { ProfileService } from '../../../../services/profile.service';
import { catchError, filter, finalize, of, switchMap, tap } from 'rxjs';
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

  displayRole: number = 0;

  roleLoading: boolean = false;

  dropdownOpen = false;
  userId: number | null = null;
  loggedIn: boolean = false;
  profileImageUrl: string = '';
  unreadCount: number = 0;

  isInProfilePage: boolean = false;
  username: string = '';
  adminDropdownOpen: boolean = false;

  private readonly LS_ROLE = 'role_id';
  private readonly LS_USER_ID = 'user_id';
  private readonly LS_USERNAME = 'user_name';

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
      this.hydrateFromStorage();

      this.loadUserRole();
    } else {
      this.resetState();
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

    if (this.displayRole === 1) {
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

  private hydrateFromStorage() {
    const storedRole = localStorage.getItem(this.LS_ROLE);
    const storedUserId = localStorage.getItem(this.LS_USER_ID);
    const storedUsername = localStorage.getItem(this.LS_USERNAME);

    if (storedRole) {
      this.displayRole = Number(storedRole);
      this.role = this.displayRole;
    }

    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.loadUnreadNotifications(this.userId);
    }

    if (storedUsername) {
      this.username = storedUsername;
    }

    this.profileImageUrl = 'assets/person1.jpg';
  }

  private saveToStorage(roleId: number, userId: number, username: string) {
    localStorage.setItem(this.LS_ROLE, String(roleId));
    localStorage.setItem(this.LS_USER_ID, String(userId));
    localStorage.setItem(this.LS_USERNAME, username);
  }

  private clearStorage() {
    localStorage.removeItem(this.LS_ROLE);
    localStorage.removeItem(this.LS_USER_ID);
    localStorage.removeItem(this.LS_USERNAME);
  }

  loadUserRole() {
    this.roleLoading = true;
    this.profileService.getProfile().pipe(
      catchError(err => {
        console.error('Failed to fetch profile', err);
        return of(null);
      }),
      switchMap(profile => {
        if (!profile?.user_id) return of(null);
        return this.profileService.getUserById(profile.user_id).pipe(
          catchError(err => {
            console.error('Failed to fetch user by ID', err);
            return of(null);
          })
        );
      }),
      tap(user => {
        if (!user) return;

        const newRole = Number(user.role_id || 0);
        const newUserId = Number(user.user_id || 0);
        const newUsername = user.user_name || 'User';


        if (newRole === 1 || newRole === 2 || newRole === 3) {
          this.role = newRole;
          this.displayRole = newRole;
        }

        this.userId = newUserId || null;
        this.username = newUsername;

        if (this.userId) {
          this.saveToStorage(this.displayRole, this.userId, this.username);
          this.loadUnreadNotifications(this.userId);
        }

        if (this.displayRole === 1) {
          this.profileImageUrl = 'assets/person1.jpg';
        }
      }),
      switchMap(user => {
        if (!user || Number(user.role_id) === 1) return of(null);
        return this.profileService.getProfileByUserId(user.user_id).pipe(
          catchError(() => of(null))
        );
      }),
      tap(profile => {
        if (profile?.photo) {
          this.profileImageUrl = 'http://localhost:8000/storage/' + profile.photo;
        }
      }),
      finalize(() => {
        this.roleLoading = false;
      })
    ).subscribe();
  }

  loadUnreadNotifications(userId: number) {
    this.notificationService.getUnreadNotifications(userId).subscribe({
      next: (notifications) => (this.unreadCount = notifications.length),
      error: () => (this.unreadCount = 0)
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
    this.clearStorage();
    this.resetState();
    this.router.navigate(['/login']);
  }

  private resetState() {
    this.loggedIn = false;
    this.role = 0;
    this.displayRole = 0;
    this.roleLoading = false;
    this.userId = null;
    this.username = '';
    this.unreadCount = 0;
    this.profileImageUrl = 'assets/person1.jpg';
    this.adminDropdownOpen = false;
    this.dropdownOpen = false;
  }

  openProfileOrLogin() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if ((this.displayRole === 2 || this.displayRole === 3) && this.userId !== null) {
      this.router.navigate(['/jobowner', this.userId]);
      return;
    }

    console.log("Admin doesn't have profile page.");
  }
}
