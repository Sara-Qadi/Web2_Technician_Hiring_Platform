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
import { ActivatedRoute, RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // استقبال الرول من صفحة role-selection
    this.route.queryParams.subscribe((params) => {
      this.role = params['role'] || null;
    });

    // Reactive Form
    this.signUpForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z]{2,20}$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z]{2,20}$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
        country: ['', Validators.required],
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

  // On Submit
  onSubmit(): void {
    this.submitted = true;

    if (this.signUpForm.valid) {
      const data = {
        ...this.signUpForm.value,
        role: this.role,
      };

      console.log('✅ Form Submitted:', data);
    } else {
      console.warn('❌ Form is invalid');
    }
  }
}
