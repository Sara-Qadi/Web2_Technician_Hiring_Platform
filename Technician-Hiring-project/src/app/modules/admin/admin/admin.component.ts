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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadTotalJobPosts();
    this.loadTotalSubmissions();
    this.createBarChart();
    this.createPieChart();
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
    new Chart('jobOverviewChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Jobs Posted',
            data: [20, 35, 40, 15],
            backgroundColor: '#641739',
            borderColor: '#641739',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  createPieChart(): void {
    new Chart('jobProgressPieChart', {
      type: 'pie',
      data: {
        labels: ['Jobs in Progress', 'Completed Jobs'],
        datasets: [
          {
            label: 'Jobs Progress',
            data: [45, 105],
            backgroundColor: ['#ffcc00', '#28a745'],
            borderColor: '#ffffff',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' Jobs';
              }
            }
          }
        }
      }
    });
  }
}
