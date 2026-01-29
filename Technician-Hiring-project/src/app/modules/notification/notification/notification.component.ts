import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { ProfileComponent } from '../../technician/profile/profile.component';
import { ProfileService } from '../../../services/profile.service';
import { NotificationService, Notification } from '../../../services/notification.service';
import { catchError, finalize, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent, FooterAdminComponent, ProfileComponent],
})
export class NotificationComponent implements OnInit {
  filter: 'all' | 'unread' = 'all';
  notifications: Notification[] = [];

  userId!: number;

  userNames: { [id: number]: string } = {};
  userDetails: { [id: number]: { name: string; imageUrl: string } } = {};

  technicianProfiles: { [id: number]: any } = {};

  userRole: any;

  // ✅ loader like your UserdetailsComponent
  loading = false;

  @ViewChild('dropdownRef', { static: true }) dropdownRef!: ElementRef;
  @Input() dropdownOpen = false;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private modalService: ProfileModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.profileService.getUser().pipe(
      catchError((err) => {
        console.error('Failed to fetch user', err);
        return of(null);
      })
    ).subscribe((user: any) => {
      if (!user?.user_id) {
        this.loading = false;
        return;
      }

      this.userId = user.user_id;

      // role (non-blocking, doesn't affect loader)
      this.profileService.getroleid(this.userId).pipe(
        catchError((err) => {
          console.error('Failed to fetch role id', err);
          return of(null);
        })
      ).subscribe((roleId) => {
        this.userRole = roleId;
        console.log('User role:', this.userRole);
      });

      // notifications (controls loader)
      this.loadNotifications();
    });
  }

  loadNotifications(): void {
    if (!this.userId) {
      this.loading = false;
      return;
    }

    this.notificationService.getNotifications(this.userId).pipe(
      catchError((err) => {
        console.error('Failed to load notifications', err);
        return of([] as Notification[]);
      }),
      finalize(() => {
        this.loading = false; // ✅ stop loader once notifications call finishes
      })
    ).subscribe((data: Notification[]) => {
      this.notifications = data || [];

      // Load names/photos for notification senders
      this.loadUserNames();
    });
  }

  loadUserNames(): void {
    const userIds = Array.from(new Set(this.notifications.map((n) => n.user_id)));

    // nothing to load
    if (userIds.length === 0) return;

    // Build requests only for ids we haven't loaded yet
    const requests = userIds
      .filter((id) => !this.userNames[id])
      .map((id) =>
        this.profileService.getUserById(id).pipe(
          catchError((error) => {
            console.error(`Failed to fetch user ${id}`, error);
            // fallback immediately
            this.userNames[id] = 'Unknown User';
            this.userDetails[id] = {
              name: 'Unknown User',
              imageUrl: 'assets/person1.jpg',
            };
            return of(null);
          })
        )
      );

    if (requests.length === 0) return;

    forkJoin(requests).subscribe((users: any[]) => {
      users.forEach((user) => {
        if (!user) return;

        const id = user.user_id;
        const name = user.user_name || `User #${id}`;

        this.userNames[id] = name;

        // Admin => default image
        if (user.role_id === 1) {
          this.userDetails[id] = {
            name,
            imageUrl: 'assets/person1.jpg',
          };
          return;
        }

        // Non-admin => try to fetch profile photo
        this.profileService.getProfileByUserId(id).pipe(
          catchError(() => {
            this.userDetails[id] = {
              name,
              imageUrl: 'assets/person1.jpg',
            };
            return of(null);
          })
        ).subscribe((profile: any) => {
          if (!profile?.photo) {
            this.userDetails[id] = {
              name,
              imageUrl: 'assets/person1.jpg',
            };
            return;
          }

          this.userDetails[id] = {
            name,
            imageUrl: 'http://localhost:8000/storage/' + profile.photo,
          };
        });
      });
    });
  }

  handleNotificationClick(notification: Notification): void {
    if (notification.read_status === 'unread') {
      this.notificationService.markAsRead(notification.notification_id).subscribe(() => {
        notification.read_status = 'read';
      });
    }

    switch (notification.type) {
      case 'new_proposal':
      case 'new-proposal':
      case 'proposal':
        this.router.navigate(['/allproposals']);
        break;

      case 'bid_response':
      case 'proposal-response':
        this.router.navigate(['/mybids']);
        break;

      case 'message':
        this.router.navigate(['/messages']);
        break;

      default:
        console.log('This notification is not routable.', notification);
        break;
    }
  }

  goToUserProfile(event: MouseEvent, userId: number): void {
    event.stopPropagation();
    this.router.navigate(['/jobowner', userId]);
  }

  filteredNotifications(): Notification[] {
    return this.filter === 'all'
      ? this.notifications
      : this.notifications.filter((n) => n.read_status === 'unread');
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => {
      if (n.read_status === 'unread') {
        this.notificationService.markAsRead(n.notification_id).subscribe(() => {
          n.read_status = 'read';
        });
      }
    });
  }

  confirmDelete(notificationId: number): void {
    const confirmed = confirm('Are you sure you want to delete this?');
    if (!confirmed) return;

    this.notificationService.deleteNotification(notificationId).subscribe(() => {
      this.notifications = this.notifications.filter((n) => n.notification_id !== notificationId);
    });
  }

  setFilter(event: Event, value: 'all' | 'unread'): void {
    event.preventDefault();
    this.filter = value;
  }

  onProfileImageClick(): void {
    this.modalService.openModal();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
