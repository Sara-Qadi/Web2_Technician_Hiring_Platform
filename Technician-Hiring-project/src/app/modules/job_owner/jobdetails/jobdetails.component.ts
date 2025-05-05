import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JobDataService } from '../../../services/jobdata.service';

@Component({
  selector: 'app-jobdetails',
  imports: [CommonModule],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css'
})
export class JobdetailsComponent {
  job: any;

  constructor(private dataService: JobDataService) {}

  ngOnInit() {
    this.job = this.dataService.getSelectedJob();
    console.log('Loaded job:', this.job); // للتأكد من أنه ليس undefined
  }
}
