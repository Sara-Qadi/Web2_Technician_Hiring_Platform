import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
})
export class UserdetailsComponent implements OnInit {
  profileForm!: FormGroup;
  editMode = false;
  profileImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010'; // صورة افتراضية
  selectedImageFile: File | null = null;
  userId!: number;
  @Input() showowner: boolean = true;
  @Input() showartisan: boolean = false;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    if (this.userId) {
      this.loadUserProfile(this.userId);
    }
  }
  initForm() {
    this.profileForm = this.fb.group({
      user_name: [''],
      email: [''],
      phone: [''],
      country: [''],
      photo: [null]
    });
  }
  loadUserProfile(userId: number) {
    const token = localStorage.getItem('token'); // أو حسب مكان تخزين التوكين
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://localhost:8000/api/profile/${userId}`, { headers })
      .subscribe({
        next: user => {
          this.profileForm.patchValue({
            user_name: user.user_name,
            email: user.email,
            phone: user.phone,
            country: user.country,
          });
          if (user.photo) {
            this.profileImageUrl = `http://localhost:8000/storage/${user.photo}`;
          }
        },
        error: err => {
          console.error('Error loading profile:', err);
        }
      });
  }

  toggleEdit(): void {
    // إعادة القيم الأصلية إلى الفورم
    if (this.userData) {
      this.profileForm.patchValue(this.userData);
      this.loadUserProfile(this.userId);
    }
    this.editMode = !this.editMode;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.profileImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }
  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm.value);
      this.editMode = false;
    }
  }
  gotomessage(){
    this.router.navigate(['/messages']);
  }
  
}
