import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { MessagingService } from '../../../services/messaging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../../../services/profile.service';
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
export class MessagingComponent implements OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  searchControl = new FormControl('');
  currentUserId = '1'; // this will be updated later from localStorage
  selectedUser: any = null;

  users: any[] = []; // كل المستخدمين اللي تواصل معهم
  messages: { senderId: string; messageText: string }[] = [];
  newMessage: string = '';

  constructor(private messagesService: MessagingService, private http: HttpClient, private profileService: ProfileService) {}

  ngOnInit() {
  this.loadCurrentUser();
}

loadCurrentUser() {
 
  this.profileService.getUser().subscribe({
    next: (user: any) => {
      this.currentUserId = user.user_id;
      console.log('✅ Logged-in user ID:', this.currentUserId);

      // بعدها حمّل المحادثات
      this.loadUserConversations();
    },
    error: (err) => {
      console.error('❌ Failed to fetch user profile:', err);
    }
  });
}

loadUserConversations() {
  this.messagesService.getUserConversations(this.currentUserId).subscribe({
    next: (data: any[]) => {
      this.users = data;
      console.log('Users:', data);
    },
    error: (err) => {
      console.error('Failed to load user conversations:', err);
    }
  });
}

  filteredUsers() {
    const term = this.searchControl.value?.toLowerCase() || '';
    const t = this.users.filter(user => user.user_name.toLowerCase().includes(term));
    return t;
  }

  selectUser(user: any) {
    this.selectedUser = user;

    this.messagesService.getConversation(this.currentUserId, user.user_id).subscribe({
      next: (data: any) => {
        console.log('Messages:', data);
        this.messages = data.map((msg: any) => ({
          senderId: msg.sender_id.toString(),
          messageText: msg.message_content
        }));
      },
      error: (err) => {
        console.error('Failed to load conversation:', err);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      const payload = {
        sender_id: this.currentUserId,
        receiver_id: this.selectedUser.user_id,
        message_content: this.newMessage
      };

      this.messagesService.storeMessage(payload).subscribe({
        next: () => {
          this.messages.push({
            senderId: this.currentUserId,
            messageText: this.newMessage
          });
          this.newMessage = '';
        },
        error: (err) => {
          console.error('Failed to send message:', err);
        }
      });
    }
  }


}