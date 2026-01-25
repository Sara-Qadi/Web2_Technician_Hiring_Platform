import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filterByPipe } from './FilterBy.pip';
import { CardListComponent } from '../cardlist/cardlist.component';
import { JobDataService } from '../../../services/jobdata.service';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { Jobpost } from '../../../models/jobpost.model';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  filterByPipe,
  CardListComponent,
  NavbarAdminComponent,
  FooterAdminComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  allCategories: string[] = [
    'electrician', 'plumber', 'painter', 'carpenter',
    'mechanic','other'
  ];
  selectedCategory: string[] = [];
  jobs: any[] = [];
  allJobs: any[] = [];
  searchInput: string = ''
  minInput: string = '';
  maxInput: string = '';
  locationInput: string = '';
  filtersEnabled: boolean = true;
  tempSelectedCategory: string[] = [];
  tempMinInput: string = '';
  tempMaxInput: string = '';
  tempLocationInput: string = '';

  constructor(private JobDataService: JobDataService, private http : HttpClient) {}

  ngOnInit(): void {
    this.JobDataService.getjobpostsfortech().subscribe({
      next: (res) => {
        this.allJobs = res.filter(job => job.status === 'pending');
        this.jobs = [...this.allJobs];
      },
      error: (err) => console.error(err)
    });
  }

  toggleFilters() {
    this.filtersEnabled = !this.filtersEnabled;
  }

  applySearch() {
    this.selectedCategory = [...this.tempSelectedCategory];
    this.minInput = this.tempMinInput;
    this.maxInput = this.tempMaxInput;
    this.locationInput = this.tempLocationInput;

    this.jobs = this.allJobs.filter(job => {
      let match = true;

      if (this.selectedCategory.length) {
        match = match && this.selectedCategory.includes(job.category.toLowerCase());
      }

      if (this.minInput) match = match && job.minimum_budget >= +this.minInput;
      if (this.maxInput) match = match && job.minimum_budget <= +this.maxInput;

      if (this.locationInput) {
        match =
          match &&
          job.location.toLowerCase().includes(this.locationInput.toLowerCase());
      }

      if (this.searchInput) {
        match =
          match &&
          job.title.toLowerCase().includes(this.searchInput.toLowerCase());
      }

      return match;
    });
  }

  resetSearch() {
    this.searchInput = '';
    this.selectedCategory = [];
    this.minInput = '';
    this.maxInput = '';
    this.locationInput = '';

    this.tempSelectedCategory = [];
    this.tempMinInput = '';
    this.tempMaxInput = '';
    this.tempLocationInput = '';

    this.jobs = [...this.allJobs];
  }


  onCategoryChange(event: any) {
    const category = event.target.value.toLowerCase();

    if (event.target.checked) {
      this.selectedCategory = [...this.selectedCategory, category];
    } 
    else {
      this.selectedCategory = this.selectedCategory.filter(c => c !== category);
    }
  }

  sortJobs(type: string) {
    switch (type) {
      case 'priceAsc':
        this.jobs = [...this.jobs].sort((a, b) => a.minimum_budget - b.minimum_budget);
        console.log(this.jobs)
        break;

      case 'priceDesc':
        this.jobs = [...this.jobs].sort((a, b) => b.minimum_budget - a.minimum_budget);
        break;

      case 'typeAsc':
        this.jobs = [...this.jobs].sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        break;

      case 'typeDesc':
        this.jobs = [...this.jobs].sort((a, b) =>
          b.category.localeCompare(a.category)
        );
        break;
    }
  }

  onTempCategoryChange(event: any) {
    const category = event.target.value.toLowerCase();
    if (event.target.checked) {
      this.tempSelectedCategory = [...this.tempSelectedCategory, category];
    } else {
      this.tempSelectedCategory = this.tempSelectedCategory.filter(c => c !== category);
    }
  

    this.JobDataService.getjobposts().subscribe({
      next: (res) => {
        this.jobs = res.filter(job => job.status === 'pending');
      },
      error: (err) => { 
        console.error('Error during search:', err); 
      }
    });
  }

}
  

