import { Component, inject , Input, OnInit } from '@angular/core';

import { CardblockComponent } from '../cardblock/cardblock.component';
import { CommonModule } from '@angular/common';
import { JobblockComponent } from '../../job_owner/jobblock/jobblock.component';
import { JobDataService } from '../../../services/jobdata.service';//lian
import { Jobpost } from '../../../models/jobpost.model';



@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [CardblockComponent,CommonModule,JobblockComponent],
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css'],
})
export class CardListComponent implements OnInit {
  jobarray: Jobpost[] = [];
  loading = false;

  constructor(private jobpostService: JobDataService) {}

  ngOnInit(): void {
    this.loading = true; 
    this.jobpostService.getjobpostsfortech().subscribe({
      next: (data) => {
        this.jobarray = data;
        console.log('Received job posts:', data);
        this.loading = false; 
        this.mergeJobs()
      },
      error: (err) => {
        console.error('Error fetching job posts:', err);
      }
    });
  }
  
  @Input() jobs: Jobpost[] = [];

  mergeJobs() {
  const merged: Jobpost[] = [];

  for (const job of this.jobs) {
    const match = this.jobarray.find(j => j.jobpost_id === job.jobpost_id);
    
    if (match) {
      merged.push(job);
    }
  }

  

  this.jobs = merged;

  console.log('Merged jobs:', this.jobs);
}

 

}
