import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class filterByPipe implements PipeTransform {
  transform(jobs: any[], categories: string[], location: string, max: string, min: string): any[] {
  if (!jobs) return [];

  const minValue = parseFloat(min);
  const maxValue = parseFloat(max);
  
  return jobs.filter(job => {
    const categoryMatch = categories.length === 0 || categories.includes(job.category.toLowerCase());
    const locationMatch = !location || job.location.toLowerCase().includes(location.toLowerCase());

    const budgetMatch =
      (isNaN(minValue) || job.minimum_budget >= minValue) &&
      (isNaN(maxValue) || job.maximum_budget <= maxValue);

    return categoryMatch && locationMatch && budgetMatch;
  });
}
}