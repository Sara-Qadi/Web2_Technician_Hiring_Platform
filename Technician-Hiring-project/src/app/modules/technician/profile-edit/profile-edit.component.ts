import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  imports: [CommonModule,  FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  showProfileModal = false;

  editableProfile = {
    imageUrl: '/assets/person1.jpg',
    name: 'Technician Name',
    specialty: 'Electrician',
    rating: 4,
    description: 'Some quick description or contact info here.'
  };

  openProfileModal() {
    this.showProfileModal = true;
  }

  closeProfileModal() {
    this.showProfileModal = false;
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editableProfile.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfileChanges() {
    console.log('Updated profile:', this.editableProfile);
    this.closeProfileModal();
  }

}
