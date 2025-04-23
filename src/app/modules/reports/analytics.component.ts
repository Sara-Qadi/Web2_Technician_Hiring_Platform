




import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../admin/admin/footer-admin/footer-admin.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  standalone: true,
  imports: [NgForOf, FormsModule, NgClass, NavbarAdminComponent, FooterAdminComponent],

  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {
  @ViewChild('monthlyChartCanvas') monthlyChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('breakdownChartCanvas') breakdownChartCanvas!: ElementRef<HTMLCanvasElement>;

  currentRole = 'admin';

  currentPeriod = 'thisMonth';

  monthlyStats = [
    { month: 'January', jobs: 23, earnings: 2300 },
    { month: 'February', jobs: 30, earnings: 2800 },
    { month: 'March', jobs: 35, earnings: 3200 },
    { month: 'April', jobs: 40, earnings: 3800 },
  ];

  earningsBreakdown = [
    { category: 'Plumbing', amount: 4200 },
    { category: 'Electrical', amount: 3100 },
    { category: 'Carpentry', amount: 2600 },
    { category: 'Painting', amount: 1900 },
    { category: 'Others', amount: 1400 }
  ];

  stats = [
    { title: 'Completed Jobs', value: 128, change: 12, icon: '<i class="bi bi-check2-circle fs-4 text-success"></i>' },
    { title: 'Total Earnings', value: '$15,200', change: 8, icon: '<i class="bi bi-cash-coin fs-4 text-primary"></i>' },
    { title: 'New Artisans', value: 23, change: 5, icon: '<i class="bi bi-person-plus fs-4 text-info"></i>' },
    { title: 'New Jobs', value: 56, change: -4, icon: '<i class="bi bi-briefcase fs-4 text-warning"></i>' }
  ];

  topArtisans = [
    { name: 'Ali Khaled', category: 'Electrical', jobs: 25, rating: 4.9, earnings: 2400 },
    { name: 'Sara Ahmad', category: 'Plumbing', jobs: 20, rating: 4.8, earnings: 2100 },
    { name: 'Hassan Omar', category: 'Carpentry', jobs: 18, rating: 4.7, earnings: 1900 }
  ];

  ngAfterViewInit(): void {
    this.initCharts();
  }

  initCharts() {
    if (this.monthlyChartCanvas) {
      const ctx = this.monthlyChartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.monthlyStats.map(m => m.month),
            datasets: [{
              label: 'Monthly Jobs',
              data: this.monthlyStats.map(m => m.jobs),
              borderColor: '#5D5CDE',
              backgroundColor: 'rgba(93, 92, 222, 0.2)',
              tension: 0.4,
              fill: true,
              pointRadius: 5
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    if (this.breakdownChartCanvas) {
      const ctx = this.breakdownChartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.earningsBreakdown.map(e => e.category),
            datasets: [{
              data: this.earningsBreakdown.map(e => e.amount),
              backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
    }
  }

  updateDashboard() {

    console.log(`Dashboard updated for role: ${this.currentRole}, period: ${this.currentPeriod}`);
  }

  onRoleChange(role: string) {
    this.currentRole = role;
    this.updateDashboard();
  }

  onPeriodChange(period: string) {
    this.currentPeriod = period;
    this.updateDashboard();
  }
  reportData = {
    financialSummary: {
      totalRevenue: 25480,
      platformFees: 2548,
      netEarnings: 22932,
    },
    jobSummary: {
      postedJobs: 248,
      completedJobs: 187,
      completionRate: 75,
    },
    performanceMetrics: {
      avgRating: 4.8,
      avgTime: '4.2 days',
      retention: 68,
    }
  };

  generateReport(): void {
    alert('Report generated successfully!');
    // You can replace this with actual logic like downloading a file or sending a request
  }
}

