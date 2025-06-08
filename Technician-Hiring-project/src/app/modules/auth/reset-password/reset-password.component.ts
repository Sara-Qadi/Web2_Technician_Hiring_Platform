import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  private token = '';
  private email = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) return;

    const { password, confirmPassword } = this.resetForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = '';
      return;
    }

    this.http
      .post('http://localhost:8000/api/reset-password', {
        token: this.token,
        email: this.email,
        password,
        password_confirmation: confirmPassword,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Password reset successfully.';
          this.errorMessage = '';
          this.resetForm.reset();
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.message || 'Something went wrong. Try again.';
          this.successMessage = '';
        },
      });
  }
}
