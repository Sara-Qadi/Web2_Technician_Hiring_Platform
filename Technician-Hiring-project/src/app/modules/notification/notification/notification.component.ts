import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  standalone: true,
  imports: [CommonModule],
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

  setFilter(event: Event, value: 'all' | 'unread') {
    event.preventDefault();
    this.filter = value;
  }

}
