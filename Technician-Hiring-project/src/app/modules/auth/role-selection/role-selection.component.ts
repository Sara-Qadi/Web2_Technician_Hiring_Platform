import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.css'],
  imports: [CommonModule, RouterModule],
})
export class RoleSelectionComponent {
  selectedRole: string | null = null;

  constructor(private router: Router) {}

  selectRole(role: string): void {
    this.selectedRole = role;
  }

  onContinue(): void {
    // توجيه المستخدم إلى صفحة التسجيل بناءً على اختياره
    // ابعث مع الرابط الـرول اللي المستخدم اختاره كـ كويري براميتر في الرابط.
    //📌 مثال:
    // لو المستخدم اختار "jobOwner"،
    //  الرابط راح يصير:
    // /sign-up?role=jobOwner

    if (this.selectedRole) {
      this.router.navigate(['/sign-up'], {
        queryParams: { role: this.selectedRole },
      });
    }
  }
}
