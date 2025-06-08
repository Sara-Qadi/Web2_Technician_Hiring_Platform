import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  showProfileModal = false;
  private modalSub!: Subscription;

  editableProfile: any = {
    name: '',
    specialty: '',
    description: '',
    imageUrl: '',
    cvUrl: ''
  };
  profilePhotoFile: File | null = null;
  cvFile: File | null = null;

  constructor(
    private profileService: ProfileService,
    private modalService: ProfileModalService
  ) {}

  ngOnInit() {
    this.modalSub = this.modalService.editModalOpen$.subscribe(isOpen => {
      this.showProfileModal = isOpen;
      if (isOpen) {
        this.loadProfile();
      }
    });
  }

  ngOnDestroy() {
    this.modalSub.unsubscribe();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.editableProfile = {
          name: profile.user_name,
          specialty: profile.specialty,
          description: profile.description,
          imageUrl: profile.photo ? `http://localhost:8000/storage/${profile.photo}` : 'assets/person1.jpg',
          cvUrl: profile.cv ? `http://localhost:8000/storage/${profile.cv}` : ''
        };
      },
      error: (err) => console.error('Failed to load profile:', err)
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profilePhotoFile = input.files[0];
    }
  }

  onCvChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cvFile = input.files[0];
    }
  }


   saveProfileChanges() {
    this.profileService.updateProfile(this.editableProfile, this.profilePhotoFile, this.cvFile).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.modalService.closeModal();
        this.profileService.getProfile().subscribe(profile => {
          this.editableProfile = {
            name: profile.user_name,
            specialty: profile.specialty,
            description: profile.description,
            imageUrl: profile.photo ? `http://localhost:8000/storage/${profile.photo}` : 'assets/person1.jpg',
            cvUrl: profile.cv ? `http://localhost:8000/storage/${profile.cv}` : ''
          };
               this.modalService.closeEditModal();
        });
      },
      error: (err) => console.error('Update failed:', err)
    });
  }


  closeProfileModal() {
    this.modalService.closeEditModal();
  }
}
