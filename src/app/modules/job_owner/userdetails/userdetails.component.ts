import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagingService } from '../../../services/messaging.service';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
})
export class UserdetailsComponent implements OnInit {
  profileForm!: FormGroup;
  editMode = false;

  profileImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010';

  userId!: number;

  @Input() showowner: boolean = true;
  @Input() showartisan: boolean = false;
  @Input() isOwnProfile: boolean = false;

  userData: any;
  loading = false;

  averageRating: number = 0;

  userRoleId: number | null = null;
  isTechnicianProfile = false;

  cvUrl: string | null = null;
  selectedCvFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();

    if (this.userId) {
      this.loading = true;

      this.profileService.getUserById(this.userId).subscribe({
        next: (user: any) => {
          this.userRoleId = user.role_id;
          this.isTechnicianProfile = user.role_id === 3;
        },
        error: (err) => console.error('Failed to fetch viewed user role', err),
      });

      this.loadUserProfile(this.userId);
      this.loadAverageRating();
    }
  }

  initForm() {
    this.profileForm = this.fb.group({
      user_name: [''],
      email: [''],
      phone: [''],
      country: [''],

      description: [''],
      specialty: [''],

      photo: [null],
      cv: [null],
    });
  }

  loadUserProfile(userId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://localhost:8000/api/profile/${userId}`, { headers }).subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          user_name: user.user_name,
          email: user.email,
          phone: user.phone,
          country: user.country,
          description: user.description,
          specialty: user.specialty,
        });

        if (user.photo) {
          this.profileImageUrl = `http://localhost:8000/storage/${user.photo}`;
        }

        if (user.cv) {
          this.cvUrl = `http://localhost:8000/storage/${user.cv}`;
        } else {
          this.cvUrl = null;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.loading = false;
      },
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      this.selectedCvFile = null;
    }
  }

  onImageSelected(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    if (!file) {
      this.loading = false;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => (this.profileImageUrl = e.target?.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('photo', file);

    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    this.http
      .post('http://localhost:8000/api/profile/update', formData, { headers })
      .subscribe({
        next: () => {
          console.log('Profile image updated successfully');
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating photo', err);
          this.loading = false;
        },
      });
  }

  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedCvFile = file;
  }

  onSubmit() {
    if (!this.profileForm.valid) return;

    this.profileService.updateJO(this.userId, this.profileForm.value).subscribe({
      next: () => {
        const formData = new FormData();

        if (this.isTechnicianProfile) {
          formData.append('specialty', this.profileForm.get('specialty')?.value || '');
          formData.append('description', this.profileForm.get('description')?.value || '');

          if (this.selectedCvFile) {
            formData.append('cv', this.selectedCvFile);
          }
        }

        const headers = {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        };

        if (!this.isTechnicianProfile) {
          alert('PROFILE UPDATED SUCCESSFULLY!!');
          this.toggleEdit();
          this.loadUserProfile(this.userId);
          return;
        }

        this.http.post('http://localhost:8000/api/profile/update', formData, { headers }).subscribe({
          next: () => {
            alert('PROFILE UPDATED SUCCESSFULLY!!');
            this.toggleEdit();
            this.loadUserProfile(this.userId);
          },
          error: (err) => {
            console.error('Error uploading technician data', err);
            alert('Error uploading CV/Specialty/About');
          },
        });
      },
      error: (err) => {
        console.error('Error updating profile', err);
        alert('Error updating profile');
      },
    });
  }

  gotomessage() {
    this.profileService.getUser().subscribe({
      next: (currentUser: any) => {
        this.messagingService.getSelectedUserToMessage(currentUser.user_id, this.userId).subscribe({
          next: (user) => {
            this.userData = user;
            this.router.navigate(['/messages']);
          },
          error: (err) => console.error('❌ Error in getSelectedUserToMessage:', err),
        });
      },
      error: (err) => console.error('❌ Error in getUser:', err),
    });
  }

  loadAverageRating() {
    if (!this.userId) return;

    this.profileService.getAverageRating(this.userId).subscribe({
      next: (res: any) => {
        this.averageRating = res.average_rating;
      },
      error: (err) => {
        console.error('Error loading average rating', err);
        this.averageRating = 0;
      },
    });
  }
}
