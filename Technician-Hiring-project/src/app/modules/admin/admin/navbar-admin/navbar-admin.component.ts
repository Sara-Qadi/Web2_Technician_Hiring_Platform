import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {NgIf} from '@angular/common';
import { NotificationDropdownComponent } from '../../../notification/notification-dropdown/notification-dropdown.component';
import { ProfileModalService } from '../../../../services/profile-modal.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NotificationDropdownComponent
  ],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  constructor(private router: Router,     private profileModalService: ProfileModalService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
   openProfileOrLogin() {
    if (this.isLoggedIn()) {
      this.profileModalService.openModal();
    } else {
      this.router.navigate(['/login']);
    }
  }

   isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

}
