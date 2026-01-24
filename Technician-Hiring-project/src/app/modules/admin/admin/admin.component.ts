import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { DashboardService } from '../../../services/dashboard.service'; // Adjust path as needed

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [NavbarAdminComponent, FooterAdminComponent]
})
export class AdminComponent implements OnInit {
  totalJobPosts: number = 0;
  totalSubmissions: number = 0;
  monthlyJobPosts: any[] = [];
  barChart: Chart | null = null;
  pendingApprovalsCount: number = 0;




  constructor(private dashboardService: DashboardService) { }
ngOnInit(): void {
  this.loadTotalJobPosts();
  this.loadTotalSubmissions();
  this.loadPendingApprovals();

  this.createPieChart();

  this.dashboardService.getJobPostsByMonth().subscribe({
    next: (res) => {
      this.monthlyJobPosts = res;
      this.createBarChart();
    },
    error: (err) => console.error('Failed to load monthly job data', err)
  });
}

loadPendingApprovals(): void {
  this.dashboardService.getPendingApprovals().subscribe({
    next: (count) => {
      this.pendingApprovalsCount = count;
    },
    error: (err) => {
      console.error('Error loading pending approvals', err);
    }
  });
}


loadTotalJobPosts(): void {
  this.dashboardService.getTotalPosts().subscribe({
    next: (res) => {
      console.log('API response for total posts:', res);
      if (typeof res === 'number') {
        this.totalJobPosts = res;
      }
      else if (res && 'total_posts' in res) {
        this.totalJobPosts = res.total_posts;
      } else {
        this.totalJobPosts = 0;
      }
    },
    error: (err) => {
      console.error('Error loading total job posts', err);
    }
  });
}

  loadTotalSubmissions(): void {
    this.dashboardService.getTotalSubmissions().subscribe({
      next: (res) => {
        if (typeof res === 'number') {
          this.totalSubmissions = res;
        } else if (res && 'total_submissions' in res) {
          this.totalSubmissions = res.total_submissions;
        } else {
          this.totalSubmissions = 0;
        }
      },
      error: (err) => {
        console.error('Error loading total submissions', err);
      }
    });
  }


createBarChart(): void {

  if (this.barChart) {
    this.barChart.destroy();
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const jobCountMap = new Map<number, number>();
  this.monthlyJobPosts.forEach(item => {
    jobCountMap.set(item.month, item.total);
  });


  const labels = monthNames;
  const data = monthNames.map((_, index) => {
    const monthNumber = index + 1;
    return jobCountMap.get(monthNumber) || 0;
  });

  this.barChart = new Chart('jobOverviewChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Jobs Posted',
        data: data,
        backgroundColor: '#2c6975',
        borderColor: '#4B6F6A',
        borderWidth: 1,
        borderRadius: 6,           
      barThickness: 28 
      }]
    },
    options: {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
        backgroundColor: '#111827',
        titleFont: {
          size: 14,
          weight: 'bold',
          family: 'manrope'
        },
        bodyFont: {
          size: 13,
          family: 'manrope'
        },
        padding: 12
      }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#f1f5f9' }
    },
    x: {
      grid: { display: false },
      ticks: {
          color: '#6b7280',
          font: {
            size: 13,
            family: 'manrope'
          }
        }
    }
  }
}

  });
}



createPieChart(): void {
  this.dashboardService.getJobStatusCounts().subscribe({
    next: (res) => {
      const data = [res.in_progress, res.completed];
      console.log('Data for pie chart:', data);
      new Chart('jobProgressPieChart', {
        type: 'doughnut',
        data: {
          labels: ['Jobs in Progress', 'Completed Jobs'],
          datasets: [
            {
              label: 'Jobs Progress',
              data: data,
              backgroundColor: ['#CBE0E0', '#0F766E'],
              borderWidth: 0 ,
              borderColor: '#ffffff',
              
            }
          ]
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                padding: 15,
                font: {
                  family: 'manrope',
                  size: 13,
                }
              }
            },
            tooltip: {
              titleFont: {
                size: 14,
                weight: 'bold',
                family: 'manrope'
              },
              bodyFont: {
                family: 'manrope',
                size: 13
              },
              padding: 12
            }
          }
        }
      });
    },
    error: (err) => {
      console.error('Error loading job status counts for pie chart', err);
    }
  });
}




}
