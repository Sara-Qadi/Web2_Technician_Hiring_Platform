import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(jobs: any[], title: string): any[] {
    if (!jobs) return [];

    return jobs.filter(job => {
      const titleMatch = job.jobTitle.toLowerCase().includes(title.toLowerCase());

      return titleMatch; 
    });
  }
}