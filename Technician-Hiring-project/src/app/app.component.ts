import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './modules/notification/notification/notification.component';
import { NotificationDropdownComponent } from './modules/notification/notification-dropdown/notification-dropdown.component';
import { ProfileComponent } from './modules/technician/profile/profile.component';
import { ProfileEditComponent } from './modules/technician/profile-edit/profile-edit.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, NotificationDropdownComponent, ProfileComponent, ProfileEditComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Technician-Hiring-project';
}
