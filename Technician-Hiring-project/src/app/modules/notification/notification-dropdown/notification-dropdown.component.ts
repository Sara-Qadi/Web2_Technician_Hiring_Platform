import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../technician/profile/profile.component';
import { ProfileModalService } from '../../../services/profile-modal.service';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrl: './notification-dropdown.component.css',
  standalone: true,
  imports: [CommonModule, ProfileComponent],
})
export class NotificationDropdownComponent {
  @ViewChild('dropdownRef', { static: true }) dropdownRef!: ElementRef;
  @Input() dropdownOpen = false;
  filter: 'all' | 'unread' = 'all';

  constructor(private router: Router, private modalService: ProfileModalService) {}
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const dropdown = document.querySelector('.dropdown-wrapper');
    const clickedInsideDropdown = dropdown?.contains(event.target as Node);

    if (!clickedInsideDropdown && this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  getUnreadCount() {
    return this.notifications.filter(n => n.unread).length;
  }

  filteredNotifications() {
    return this.filter === 'all'
      ? this.notifications
      : this.notifications.filter(n => n.unread);
  }

  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }

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

}
