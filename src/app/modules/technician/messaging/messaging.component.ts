import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NavbarAdminComponent
  ],
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  searchControl = new FormControl('');
  currentUserId = '1'; // Logged in user ID

  users = [
    { id: '1', name: 'Technician A' },
    { id: '2', name: 'Job Owner B' },
    { id: '3', name: 'Technician C' }
  ];

  selectedUser: any = null;
  messages: { senderId: string; messageText: string }[] = [];
  newMessage: string = '';

  get filteredUsers() {
    const term = this.searchControl.value?.toLowerCase() || '';
    return this.users.filter(user => user.name.toLowerCase().includes(term));
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.messages = [
      { senderId: '1', messageText: 'Hello there!' },
      { senderId: user.id, messageText: 'Hi! How can I help you?' }
    ];
    setTimeout(() => this.scrollToBottom(), 0);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        senderId: this.currentUserId,
        messageText: this.newMessage
      });
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  scrollToBottom() {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Failed to scroll:', err);
    }
  }
}
