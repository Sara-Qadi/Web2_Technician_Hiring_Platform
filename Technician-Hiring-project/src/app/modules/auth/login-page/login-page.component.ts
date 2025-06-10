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

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log('Login successful!', res);
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('Login failed:', err);
          
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
    this.loginError = null; 
  }
}
