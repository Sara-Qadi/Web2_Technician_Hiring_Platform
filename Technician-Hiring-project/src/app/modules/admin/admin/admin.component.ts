import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [NavbarAdminComponent, FooterAdminComponent]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createBarChart();
    this.createPieChart();
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
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' Jobs';
              }
            }
          }
        }
      }
    });
  }
}
