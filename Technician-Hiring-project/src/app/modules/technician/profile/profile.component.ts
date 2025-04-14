import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  showProfileModal = false;

  openProfileModal() {
    this.showProfileModal = true;
  }

  closeProfileModal() {
    this.showProfileModal = false;
  }

}
