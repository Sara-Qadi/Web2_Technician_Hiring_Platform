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
    FooterAdminComponent
  ],
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
  searchInput: string = ''
  minInput: string = '';
  maxInput: string = '';
  locationInput: string = '';

  constructor(private JobDataService: JobDataService, private http : HttpClient) {}

  ngOnInit(): void {
    this.JobDataService.getjobposts().subscribe({
      next: (res) => {
        this.jobs = res.filter(job => job.status === 'pending');
      },
      error: (err) => { 
        console.error('Error during search:', err); 
      }
    });
  }

  applySearch() {

    this.searchInput = this.searchInput.trim();

    if (!this.searchInput)
    {
      this.JobDataService.getjobpostsfortech().subscribe({
        next: (res) =>{
          this.jobs = res;
          
        },
        error: (err) => { 
          console.error('Error during search:', err);
        }

    });
      return;  
    }
    
    this.JobDataService.filterJobs(this.searchInput).subscribe({
      next: (res : any[]) => {
        this.jobs = res;
        console.log(this.searchInput , this.jobs);
      },
      error: (err : any[]) => {
        console.error('Error filtering jobs:', err);
      }
    });
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
  }

