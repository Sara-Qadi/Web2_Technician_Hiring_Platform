import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.value.email;
  //     const password = this.loginForm.value.password;

  //     console.log('Login successful! Email:', email);
  //     // هون بس تحققت انه الفورم صحيح
  //     //عملية التوجيه  للداشبورد رح تتم لاحقا لما نربط مع الباك اند

  //     console.log('Form is valid, but no navigation yet');
  //     //this.router.navigate(['/']);
  //   }
  // }
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log('Login successful!', res);
          this.router.navigate(['/']); // أو أي صفحة بدك تحول لها
        },
        error: (err) => {
          console.error('Login failed:', err);
          // اعرض رسالة خطأ للمستخدم لو بدك
          this.loginError = 'The email or password is incorrect.';
        },
      });
    }
  }

  onGoogleSignIn() {
    console.log('Google Sign In clicked!');
  }

  get emailHasValue(): boolean {
    return this.loginForm.get('email')?.value?.trim()?.length > 0;
  }

  onInputChange() {
    this.loginError = null; // تمسح رسالة الخطأ لما المستخدم يبدأ يكتب
  }
}
