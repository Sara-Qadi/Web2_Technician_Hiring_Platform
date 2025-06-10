import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SearchComponent } from './modules/technician/search/search.component';
import { SubmitBidesComponent } from './modules/technician/submit-bides/submit.bides.component';
import { NotificationComponent } from './modules/notification/notification/notification.component';
import { NotificationDropdownComponent } from './modules/notification/notification-dropdown/notification-dropdown.component';
import { ProfileComponent } from './modules/technician/profile/profile.component';
import { ProfileEditComponent } from './modules/technician/profile-edit/profile-edit.component';
import { JobListComponent } from './modules/job_owner/joblist/joblist.component';
import { AnalyticsComponent } from './modules/reports/analytics.component';

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    NotificationComponent,
    NotificationDropdownComponent,
    ProfileComponent,
    ProfileEditComponent,
    JobListComponent,
    AnalyticsComponent,
    CommonModule,
    SearchComponent,
    SubmitBidesComponent,
    RouterOutlet,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Technician-Hiring-project';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url.split(/[?#]/)[0].replace(/\/+$/, '');
        const authRoutes = [
          '/login',
          '/sign-up',
          '/forgot-password',
          '/role-selection',
          '/reset-password',
        ];

        const isAuthRoute = authRoutes.includes(currentUrl);
        document.body.classList.toggle('with-navbar', !isAuthRoute);

        console.log(
          'Normalized URL:',
          currentUrl,
          '| Auth Route:',
          isAuthRoute
        );
      }
    });
  }
}
