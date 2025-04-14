import { Routes } from '@angular/router';
import { NotificationComponent } from './modules/notification/notification/notification.component';

export const routes: Routes = [
  { path: 'notifications', component: NotificationComponent },
];

import {
  CraftsmenRegistrationsComponent
} from './modules/admin/admin/craftsmen-registrations/craftsmen-registrations.component';
import {AdminComponent} from './modules/admin/admin/admin.component';
import {DeleteCraftsmanComponent} from './modules/admin/admin/delete-craftsman/delete-craftsman.component';
import {JopListingComponent} from './modules/admin/admin/jop-listing/jop-listing.component';
import {NavbarAdminComponent} from './modules/admin/admin/navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from './modules/admin/admin/footer-admin/footer-admin.component';

export const routes: Routes = [
  {path:'admin/dashboard', component:AdminComponent},
  {path: 'admin/craftsmen-registrations', component:CraftsmenRegistrationsComponent},
  {path: 'admin/delete-craftsman', component:DeleteCraftsmanComponent},
  {path: 'admin/jop-listing', component:JopListingComponent},
  {path: 'navbar-admin', component: NavbarAdminComponent},
  {path: 'footer-admin', component:FooterAdminComponent},

];

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



