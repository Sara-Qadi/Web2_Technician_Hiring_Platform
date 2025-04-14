import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pip';  
import { CardListComponent } from '../cardlist/cardlist.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, CardListComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  jobs: any[] = [];
  termInput: string = '';
  term: string = '';
  categoryInput: string = '';
  minInput: string = '';
  maxInput: string = '';
  locationInput: string = '';

  constructor(private dataService: DataService) {
    this.jobs = this.dataService.getJobs();
  }

  applySearch() {
    this.term = this.termInput.trim();
  }

}
