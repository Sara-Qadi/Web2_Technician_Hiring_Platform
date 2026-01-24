import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-outsideprofile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './outsideprofile.component.html',
  styleUrls: ['./outsideprofile.component.css'],
})
export class OutsideprofileComponent implements OnInit, OnDestroy {
  showProfileModal = false;
  userName: string = '';
  userPhone: Number = 0;
  averageRating: number = 0;
  profile: any = null;
  showCreateForm = false;
  private sub!: Subscription;
  userCountry: string = '';
    role: number = 0;
  userId: number | null = null;

  constructor(private modalService: ProfileModalService, public profileService: ProfileService) {}

  ngOnInit() {
  this.sub = this.modalService.modalOUTSIDE$.subscribe((techId: number | null) => {
    console.log('Received techId:', techId);
    this.showProfileModal = techId !== null;

    if (techId !== null) {
      this.userId = techId;
      this.loadProfileById(techId);
    }
  });
}
  loadProfileById(id: number) {
  this.profileService.getUserById(id).subscribe({
    next: (user) => {
      this.userName = user.user_name;
      this.userPhone = user.phone;
      this.userCountry = user.country;
      this.role = user.role_id;

      this.profileService.getProfileByUserId(id).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showCreateForm = !profile?.specialty && !profile?.description && !profile?.cv;
        },
        error: () => {
          this.profile = null;
          this.showCreateForm = true;
        }
      });

      this.loadAverageRating();
    },
    error: (err) => {
      console.error('Failed to fetch user info by ID:', err);
      this.showCreateForm = true;
    }
  });
}

  profilePictureFile: File | null = null;
  profileImagePreview: string | ArrayBuffer | null = null;


onProfilePictureSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.profilePictureFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
getProfileImageUrl(): string {
  if (this.profile?.photo) {
    return `http://localhost:8000/storage/${this.profile.photo}`;
  }
  return 'assets/person1.jpg';
}



  loadProfile() {
    this.profileService.getUser().subscribe({
      next: (user) => {
        this.userName = user.user_name;
        this.userPhone = user.phone;
         this.userCountry = user.country;

 this.profileService.getProfile().subscribe({
  next: (profile) => {
    this.profile = profile;

    if (!profile.specialty && !profile.description && !profile.cv) {
      this.showCreateForm = true;
    } else {
      this.showCreateForm = false;
    }
  },
  error: () => {
    this.profile = null;
    this.showCreateForm = true;
  }
});

      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
        this.showCreateForm = true;
      }
    });
  }

onCreateProfile(formData: any) {
  this.profileService.createProfile(formData, this.profilePictureFile).subscribe({
    next: () => {

      this.profileService.getProfile().subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showCreateForm = false;
        },
        error: () => {
          console.error('Failed to reload profile after creation');
        }
      });
    },
    error: (err) => {
      console.error('Failed to create profile:', err);
    }
  });
}
loadUserRole() {
  this.profileService.getProfile()
    .pipe(
      catchError(error => {
        console.error('Failed to fetch profile', error);
        return of(null);
      })
    )
    .subscribe(profile => {
      if (profile && profile.user_id) {
        this.profileService.getUserById(profile.user_id)
          .pipe(
            catchError(error => {
              console.error('Failed to fetch user by ID', error);
              return of(null);
            })
          )
          .subscribe(user => {
            if (user) {
              this.role = user.role_id;
              this.userId = user.user_id;
              console.log('User ID:', this.userId);
              console.log('User role:', this.role);

              this.loadAverageRating();
            }
          });
      } else {
        console.warn('Profile does not contain user_id');
      }
    });
}
loadAverageRating() {
  if (!this.userId) return;

  this.profileService.getAverageRating(this.userId).subscribe({
    next: (res) => {
      this.averageRating = res.average_rating;
      console.log('Average rating:', this.averageRating);
    },
    error: (err) => {
      console.error('Error loading average rating', err);
      this.averageRating = 0;
    }
  });
}

  openEditProfileModal() {
    this.modalService.closeModal();
    this.modalService.openEditModal();
  }

  closeProfileModal() {
    this.modalService.closeOUTModal();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  roundRating(rating: number): number {
  return Math.round(rating);
}
}