import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from './modules/notification/notification/notification.component';
import { NotificationDropdownComponent } from './modules/notification/notification-dropdown/notification-dropdown.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, NotificationDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Technician-Hiring-project';
}
