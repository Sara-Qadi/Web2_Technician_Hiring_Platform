//

import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { Router } from '@angular/router';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { ProfileComponent } from '../../technician/profile/profile.component';
import { ProfileService } from '../../../services/profile.service';
import { NotificationService, Notification } from '../../../services/notification.service';

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


  @ViewChild('dropdownRef', { static: true }) dropdownRef!: ElementRef;
  @Input() dropdownOpen = false;

  constructor(
    private router: Router,
   private profileService: ProfileService,
    private modalService: ProfileModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.profileService.getUser().subscribe({
      next: (user) => {
   this.userId = user.user_id;

        this.loadNotifications();
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      },
    });
  }

  loadNotifications(): void {
    if (!this.userId) return;
    this.notificationService.getNotifications(this.userId).subscribe({
      next: (data) => {
        this.notifications = data;
             this.loadUserNames();
      },
      error: (err) => console.error('Failed to load notifications', err),
    });
  }

loadUserNames() {
  const userIds = Array.from(new Set(this.notifications.map(n => n.user_id)));
  userIds.forEach(id => {
    if (!this.userNames[id]) {
      this.profileService.getUserById(id).subscribe({
        next: (user) => {
          this.userNames[id] = user.user_name;
        },
        error: () => {
          this.userNames[id] = 'Unknown User';
        }
      });
    }
  });
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

  confirmDelete(notificationId: number): void {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
      this.notificationService.deleteNotification(notificationId).subscribe(() => {
        this.notifications = this.notifications.filter(n => n.notification_id !== notificationId);
      });
    }
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
