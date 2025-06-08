import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  emailSent = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  successMessage: string | null = null;
  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const emailValue = this.email?.value;

      this.successMessage = null;
      this.errorMessage = null;

      this.authService.sendResetLink(emailValue).subscribe({
        next: (res) => {
          this.successMessage = res.message;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Something went wrong.';
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid email.';
    }
  }
}
