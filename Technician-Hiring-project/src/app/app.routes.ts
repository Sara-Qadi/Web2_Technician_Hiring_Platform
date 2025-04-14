import { Routes } from '@angular/router';
import { LoginPageComponent } from './modules/auth/login-page/login-page.component';
import { RoleSelectionComponent } from './modules/auth/role-selection/role-selection.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: LoginPageComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  { path: 'role-selection', component: RoleSelectionComponent }, // المسار لصفحة اختيار الدور

  { path: 'sign-up', component: SignUpComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
];

