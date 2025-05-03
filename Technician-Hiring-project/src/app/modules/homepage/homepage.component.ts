import { Component, HostListener } from '@angular/core';
import { NavbarAdminComponent } from '../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../admin/admin/footer-admin/footer-admin.component';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [NavbarAdminComponent, FooterAdminComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  services = ['Plumber', 'Electrician', 'Painter', 'Carpenter', 'Maid', 'Gardener'];
  filteredSuggestions: string[] = [];
  searchQuery: string = '';
  dropdownOpen: boolean = false;

  constructor(private router: Router) {}

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredSuggestions = this.services.filter(service =>
      service.toLowerCase().includes(query)
    );
    this.dropdownOpen = this.filteredSuggestions.length > 0 && query.length > 0;
  }

  onSearchClick(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home']);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const searchContainer = document.querySelector('.search-container');
    const target = event.target as HTMLElement;
    if (searchContainer && !searchContainer.contains(target)) {
      this.dropdownOpen = false;
    }
  }
}