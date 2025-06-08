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

  onImageSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  // عرض الصورة مؤقتًا
  const reader = new FileReader();
  reader.onload = e => this.profileImageUrl = e.target?.result as string;
  reader.readAsDataURL(file);

  // تجهيز البيانات وإرسالها
  const formData = new FormData();
  formData.append('photo', file);

  const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  };

  this.http.post('http://localhost/BackEnd-Technician-Hiring-Platform/public/api/profile/update', formData, { headers })
    .subscribe(() => console.log('✔️ صورة البروفايل تم رفعها'));
}

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm.value);
      this.profileService.updateJO(this.userId, this.profileForm.value).subscribe({
        next: () => {
          alert('✅ تم تحديث الملف الشخصي بنجاح');
          this.router.navigate(['/jobowner', this.userId]);
        },
        error: err => {
          console.error('Error updating profile:', err);
          alert('❌ فشل تحديث الملف الشخصي');
        }
      });
      this.editMode = false;
    }
  }
  gotomessage(){
    this.router.navigate(['/messages']);
  }

}
