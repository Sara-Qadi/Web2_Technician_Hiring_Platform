import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filterByPipe } from './FilterBy.pip';
import { CardListComponent } from '../cardlist/cardlist.component';
import { JobDataService } from '../../../services/jobdata.service';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    filterByPipe,
    CardListComponent,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  allCategories: string[] = [
    'electrician', 'plumber', 'painter', 'carpenter',
    'mechanic', 'tiler', 'welder', 'roofing-specialist',
    'mason', 'ac-technician', 'security-camera-installer', 'other'
  ];
  selectedCategory: string[] = [];
  jobs: any[] = [];
  searchInput: string = ''
  minInput: string = '';
  maxInput: string = '';
  locationInput: string = '';

  constructor(private JobDataService: JobDataService, private http : HttpClient) {}

  ngOnInit(): void {
    this.jobs = this.JobDataService.getJobs();
  }

  applySearch() {

    this.searchInput = this.searchInput.trim();

    if (!this.searchInput)
    {
      this.jobs = this.JobDataService.getJobs();
      return;  
    }

    this.http.get<any[]>(`http://127.0.0.1:8000/api/jobpost/filterJobs/${this.searchInput}`)
    .subscribe({
      next: (res) => {
        this.jobs = res;
        console.log('Search results:', this.jobs);
      },
      error: (err) => { 
        console.error('Error during search:', err);
      }
    });
  }

  onCategoryChange(event: any) {
    const category = event.target.value;

    if (event.target.checked) {
      this.selectedCategory = [...this.selectedCategory, category];
    } else {
      this.selectedCategory = this.selectedCategory.filter(c => c !== category);
    }
  }
}
