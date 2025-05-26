import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jobs = [
    {
      jobTitle: 'Sports coach',
      category: 'Mechanic',
      jobDescription: 'Lose anyone effect lead receive dog magazine call. Not fill light money company air act. Season fly return to probably heart teach economy.',
      minBudget: 71,
      maxBudget: 264,
      location: 'Tulkarem',
      deadline: '2025-04-30',
      attachments: ['https://www.lorempixel.com/965/693'],
      status: 'pending'
    },
    {
      jobTitle: 'otrap rte',
      category: 'Mechanic',
      jobDescription: 'Lose anyone effect lead receive dog magazine call. Not fill light money company air act. Season fly return to probably heart teach economy.',
      minBudget: 71,
      maxBudget: 264,
      location: 'Tulkarem',
      deadline: '2025-04-30',
      attachments: ['https://www.lorempixel.com/965/693'],
      status: 'pending'
    },
    {
      jobTitle: 'Sports coach',
      category: 'Mechanic',
      jobDescription: 'Lose anyone effect lead receive dog magazine call. Not fill light money company air act. Season fly return to probably heart teach economy.',
      minBudget: 71,
      maxBudget: 264,
      location: 'Tulkarem',
      deadline: '2025-04-30',
      attachments: ['https://www.lorempixel.com/965/693'],
      status: 'pending'
    },
    {
      jobTitle: 'Sports coach',
      category: 'Mechanic',
      jobDescription: 'Lose anyone effect lead receive dog magazine call. Not fill light money company air act. Season fly return to probably heart teach economy.',
      minBudget: 71,
      maxBudget: 264,
      location: 'Tulkarem',
      deadline: '2025-04-30',
      attachments: ['https://www.lorempixel.com/965/693'],
      status: 'pending'
    },


  ];

  constructor() {}

  getJobs() {
    return this.jobs;
  }

  removeJob(index: number) {
    this.jobs.splice(index, 1);
  }

  updateJob(originalJob: any, updatedJob: any) {
    const index = this.jobs.indexOf(originalJob);
    if (index > -1) {
      this.jobs[index] = updatedJob;
    }
  }
  // تخزين الجوب المختارة لعرض التفاصيل
  setSelectedJob(job: any) {
    this.jobs = job;
  }

  // استرجاع الجوب المختارة
  getSelectedJob() {
    return this.jobs;
  }
}
