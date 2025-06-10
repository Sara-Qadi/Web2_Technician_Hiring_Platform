import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  role: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // استقبال الرول من صفحة role-selection
    this.route.queryParams.subscribe((params) => {
      this.role = params['role'] || null;
    });

    // Reactive Form
    this.signUpForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern('^[A-Za-z]{2,20}$'),
            Validators.maxLength(50),
          ],
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            Validators.pattern('^[0-9\\-\\+\\(\\)\\s]*$'),
          ],
        ],

        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
        country: ['', [Validators.required, Validators.maxLength(50)]],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Password Match Validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  registerError: string | null = null;
  backendErrors: any = {};

  onSubmit(): void {
    this.submitted = true;
    this.backendErrors = {};

    if (this.signUpForm.valid && this.role) {
      const formValue = this.signUpForm.value;

      const data = {
        user_name: formValue.userName,
        email: formValue.email,
        phone: formValue.phone,
        password: formValue.password,
        country: formValue.country,
        role_id: this.role === 'technician' ? 3 : this.role === 'admin' ? 1 : 2, 
      };

      this.authService.register(data).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          console.log('Registered successfully! Token:', res.token); 
           this.router.navigate(['/']);

        },

        error: (err) => {
            console.log('Error status:', err.status);
  console.log('Error body:', err.error);
          console.error('Registration failed!');
          if (err.status === 422) {
            this.backendErrors = err.error.errors;
          } else {
            this.registerError = 'Something went wrong. Please try again.';
          }
        },
      });
    }
  }

  get emailHasValue(): boolean {
    return this.signUpForm.get('email')?.value?.trim()?.length > 0;
  }
}
