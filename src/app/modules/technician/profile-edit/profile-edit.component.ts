import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileModalService } from '../../../services/profile-modal.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  showProfileModal = false;
  private sub!: Subscription;

  editableProfile = {
    imageUrl: '/assets/person1.jpg',
    name: 'Technician Name',
    specialty: 'Electrician',
    rating: 4,
    description: 'Some quick description or contact info here.'
  };


  constructor(private modalService: ProfileModalService) {}

  ngOnInit() {
    this.sub = this.modalService.editModalOpen$.subscribe(isOpen => {
      this.showProfileModal = isOpen;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeProfileModal() {
    this.modalService.closeEditModal();
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
  openProfileModal() {
    this.modalService.openEditModal();
  }

}
