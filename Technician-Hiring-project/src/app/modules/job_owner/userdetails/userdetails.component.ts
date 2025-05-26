import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userdetails',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent {
  profileImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010';  // صورة افتراضية
  profileForm = new FormGroup({
    jname: new FormControl('Sarah Al-Khatib', Validators.required),
    jemail: new FormControl('sarah.khatib@example.com', [Validators.required, Validators.email]),
    jphone: new FormControl('+962 79 123 4567'),
    jcity: new FormControl('Nablus'),
    jabout: new FormControl('I post jobs often for home services.')
  });
  editMode: boolean = false;
  constructor(private router: Router) {}

  // توجيه عند تغيير الصورة
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // تغيير بين الوضعين (التعديل و العرض)
  toggleEdit() {
    this.editMode = !this.editMode;
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
  @Input() showowner:boolean | undefined;
  @Input() showartisan:boolean | undefined;
}
