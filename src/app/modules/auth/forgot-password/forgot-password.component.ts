import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) {
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

      // Fake response
      this.successMessage = `Reset link sent to ${emailValue}`;
    } else {
      this.errorMessage = 'الايميل مش موجود بالداتا بيس';
    }
  }
}
