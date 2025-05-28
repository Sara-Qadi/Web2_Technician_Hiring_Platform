import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { Router } from '@angular/router';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { ProfileComponent } from '../../technician/profile/profile.component';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent,FooterAdminComponent, ProfileComponent],
})
export class NotificationComponent {
  filter: 'all' | 'unread' = 'all';
  notifications = [
    {
      image: 'assets/person1.jpg',
      name: 'Sara',
      message: ' Made an offer',
      time: '1h',
      unread: true
    },
    {
      image: 'assets/person1.jpg',
      name: 'Alaa',
      message: ' Made an offer',
      time: '3h',
      unread: true
    },
    {
      image: 'assets/person1.jpg',
      name: 'Izzat',
      message: ' Made an offer',
      time: '8h',
      unread: true
    },
    {
      image: 'assets/person1.jpg',
      name: 'Omar',
      message: ' Made an offer',
      time: '1d',
      unread: false
    },
    {
      image: 'assets/person1.jpg',
      name: 'Leen',
      message: ' Made an offer',
      time: '1d',
      unread: true
    },
    {
      image: 'assets/person1.jpg',
      name: 'Basel',
      message: ' Made an offer',
      time: '10d',
      unread: false
    },
    {
      image: 'assets/person1.jpg',
      name: 'Lian',
      message: ' Made an offer',
      time: '10d',
      unread: true
    },
    {
      image: 'assets/person1.jpg',
      name: 'John',
      message: ' Made an offer',
      time: '10d',
      unread: false
    }
  ];
  filteredNotifications() {
    if (this.filter === 'all') {
      return this.notifications;
    }
    return this.notifications.filter(n => n.unread);
  }
  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }
  confirmDelete(index: number): void {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
      this.deleteNotification(index);
    }
  }
markAllAsRead(): void {
  this.notifications = this.notifications.map(n => ({ ...n, unread: false }));
}

  setFilter(event: Event, value: 'all' | 'unread') {
    event.preventDefault();
    this.filter = value;
  }
  @ViewChild('dropdownRef', { static: true }) dropdownRef!: ElementRef;
  @Input() dropdownOpen = false;

  constructor(private router: Router, private modalService: ProfileModalService) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }


  onProfileImageClick() {
    this.modalService.openModal();
  }


}
