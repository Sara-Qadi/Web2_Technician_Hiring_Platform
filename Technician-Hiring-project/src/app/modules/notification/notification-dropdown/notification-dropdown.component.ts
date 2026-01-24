import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationService, Notification } from '../../../services/notification.service';
import { ProfileService } from '../../../services/profile.service';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css'],
  imports:[CommonModule],
})
export class NotificationDropdownComponent implements OnInit {
  @Input() dropdownOpen = false;
  @ViewChild('dropdownRef', { static: true }) dropdownRef!: ElementRef;

  filter: 'all' | 'unread' = 'all';
  notifications: Notification[] = [];
  userId!: number;

  userNames: { [id: number]: string } = {};
  userDetails: { [id: number]: { name: string, imageUrl: string } } = {};
  userRole: any;


  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private profileService: ProfileService,
    public modalService: ProfileModalService
  ) {}

ngOnInit(): void {
  this.profileService.getUser().subscribe({
    next: (user) => {
      this.userId = user.user_id;
      this.loadNotifications();
      this.profileService.getroleid(this.userId).subscribe({
        next: (roleId) => {
          this.userRole = roleId;
          console.log('User role:', this.userRole);
        },
        error: (err) => {
          console.error('Failed to fetch role id', err);
          this.userRole = null;
        }
      });
    },
    error: (err) => {
      console.error('Failed to fetch user', err);
    }
  });
}


  loadNotifications(): void {
    this.notificationService.getNotifications(this.userId).subscribe({
      next: (data) => {
        this.notifications = data;
        this.loadUserNames();
      }
    });
  }
handleNotificationClick(notification: Notification): void {
  if (notification.read_status === 'unread') {
    this.notificationService.markAsRead(notification.notification_id).subscribe(() => {
      notification.read_status = 'read';
    });
  }

  switch (notification.type) {

    case 'technician_request':
    case 'technician-request':
    case 'join_request':
    case 'join-request':
    case 'new_registration':
    case 'new-registration':
      if (this.userRole === 1) {
        this.router.navigate(['/admin/craftsmen-registrations']);
      } else {
        console.log('Only admin should navigate to registrations.');
      }
      break;

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


loadUserNames() {
  const userIds = Array.from(new Set(this.notifications.map(n => n.user_id)));

  userIds.forEach(id => {
    if (!this.userNames[id]) {
      this.profileService.getUserById(id).pipe(
        catchError(error => {
          console.error(`Failed to fetch user ${id}`, error);
          this.userNames[id] = 'Unknown User';
          this.userDetails[id] = {
            name: 'Unknown User',
            imageUrl: 'assets/person1.jpg'
          };
          return of(null);
        })
      ).subscribe(user => {
        if (!user) return;

        this.userNames[id] = user.user_name;

        if (user.role_id === 1) {
          this.userDetails[id] = {
            name: user.user_name,
            imageUrl: 'assets/person1.jpg'
          };
        } else {
          this.profileService.getProfileByUserId(id).pipe(
            catchError(() => {
              this.userDetails[id] = {
                name: user.user_name,
                imageUrl: 'assets/person1.jpg'
              };
              return of(null);
            })
          ).subscribe(profile => {
            if (!profile) return;

            this.userDetails[id] = {
              name: user.user_name,
              imageUrl: 'http://localhost:8000/storage/' + profile.photo
            };
          });
        }
      });
    }
  });
}
goToUserProfile(event: MouseEvent, userId: number): void {
  event.stopPropagation();
  this.router.navigate(['/jobowner', userId]);
}

  filteredNotifications(): Notification[] {
    return this.filter === 'all'
      ? this.notifications
      : this.notifications.filter(n => n.read_status === 'unread');
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => {
      if (n.read_status === 'unread') {
        this.notificationService.markAsRead(n.notification_id).subscribe(() => {
          n.read_status = 'read';
        });
      }
    });
  }

  deleteNotification(id: number): void {
    this.notificationService.deleteNotification(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.notification_id !== id);
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this?')) {
      this.deleteNotification(id);
    }
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.dropdownRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
