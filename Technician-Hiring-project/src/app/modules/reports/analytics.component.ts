




import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgClass, NgForOf ,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../admin/admin/footer-admin/footer-admin.component';
import { ReportcardComponent } from './reportcard/reportcard.component';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  standalone: true,
  imports: [NgForOf, FormsModule, NgClass, NavbarAdminComponent, FooterAdminComponent,ReportcardComponent,NgIf],

  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  selectedTable=' jobCompletion';
  pageSize = 5;
  currentPage = 1;
  searchTerm='';
  selectedCategory: string = 'all';

  tables:any= {
    jobCompletion: {
      headers: ['Month', 'Completed Jobs', 'Cancelled Jobs', 'In Progress Jobs', 'Completion Rate'],
      data: [
        ['January', 152, 12, 25, '80.4%'],
        ['February', 187, 8, 20, '87.0%'],
        ['March', 210, 10, 15, '89.4%']
      ],
    },
    earnings: {
      headers: ['Artisan Name', 'Completed Jobs', 'Avg Job Price', 'Total Earnings', 'Job Completion Rate'],
      data: [
        ['Ahmed Salem', 42, '$75', '$3,150', '92.5%'],
        ['Sara Naji', 35, '$90', '$3,150', '94.7%'],
        ['Khaled Omar', 28, '$85', '$2,380', '90.3%']
      ],
    },
    topRatedArtisans: {
      headers: ['Artisan Name', 'Category', 'Rating', 'Completed Jobs', 'Satisfaction Rate'],
      data: [
        ['Sara Naji', 'Electrician', 4.9, 35, '98.0%'],
        ['Youssef Adel', 'Plumber', 4.8, 30, '96.0%'],
        ['Lina Tarek', 'Carpenter', 4.7, 27, '94.0%']
      ],},

    lowPerformanceUsers: {
      headers: ['User Name', 'Role', 'Avg Rating', 'Flags', 'Last Reported Issue', 'Action Required'],
      data: [
        ['Nader Fathy', 'Artisan', 2.5, 3, 'Late delivery', 'Warning'],
        ['Heba Zain', 'Job Owner', 2.8, 2, 'Non-payment complaint', 'Review'],
        ['Amr Mohsen', 'Artisan', 2.2, 5, 'Unprofessional behavior', 'Suspension'],
        ['Nader Fathy', 'Artisan', 2.5, 3, 'Late delivery', 'Warning'],
        ['Heba Zain', 'Job Owner', 2.8, 2, 'Non-payment complaint', 'Review'],
        ['Amr Mohsen', 'Artisan', 2.2, 5, 'Unprofessional behavior', 'Suspension'],
        ['Nader Fathy', 'Artisan', 2.5, 3, 'Late delivery', 'Warning'],
        ['Heba Zain', 'Job Owner', 2.8, 2, 'Non-payment complaint', 'Review'],
        ['Amr Mohsen', 'Artisan', 2.2, 5, 'Unprofessional behavior', 'Suspension'],
        ['Nader Fathy', 'Artisan', 2.5, 3, 'Late delivery', 'Warning'],
        ['Heba Zain', 'Job Owner', 2.8, 2, 'Non-payment complaint', 'Review'],
        ['Amr Mohsen', 'Artisan', 2.2, 5, 'Unprofessional behavior', 'Suspension'],
        ['Nader Fathy', 'Artisan', 2.5, 3, 'Late delivery', 'Warning'],
        ['Heba Zain', 'Job Owner', 2.8, 2, 'Non-payment complaint', 'Review'],
        ['Amr Mohsen', 'Artisan', 2.2, 5, 'Unprofessional behavior', 'Suspension'],
        ['Nader Fathy', 'Artisan', 2.5, 3, 'Late delivery', 'Warning'],
        ['Heba Zain', 'Job Owner', 2.8, 2, 'Non-payment complaint', 'Review'],
        ['Amr Mohsen', 'Artisan', 2.2, 5, 'Unprofessional behavior', 'Suspension'],
      ],},
    monthlyActivity: {
      headers: ['Month', 'New Users', 'Jobs Posted', 'Jobs Completed', 'Total Earnings'],
      data: [
        ['January', 120, 300, 152, '$11,200'],
        ['February', 140, 320, 187, '$13,500'],
        ['March', 130, 340, 210, '$15,200']
      ]},
    locationBasedDemand: {
      headers: ['City', 'Jobs Posted', 'Top Category', 'Active Artisans', 'Demand-Supply Ratio'],
      data: [
        ['Amman', 420, 'Plumbing', 45, '9.3'],
        ['Irbid', 180, 'Electrical Work', 22, '8.2'],
        ['Zarqa', 250, 'Home Repair', 30, '8.3']
      ],},
    paymentTransaction: {
      headers: ['Transaction ID', 'Job Title', 'Job Owner', 'Artisan', 'Amount', 'Status', 'Date'],
      data: [
        ['TXN123456', 'Fix kitchen sink', 'Rana Khaled', 'Youssef Adel', '$80', 'Completed', '2025-03-05'],
        ['TXN123457', 'Install lighting', 'Omar Salem', 'Sara Naji', '$120', 'Completed', '2025-03-06'],
        ['TXN123458', 'Paint wall', 'Khalid Omar', 'Lina Tarek', '$90', 'Pending', '2025-03-07']
      ],},

  }




  get paginatedData() {
    const table = this.tables[this.selectedTable];
    if (!table || !table.data) return [];

    let filteredData = table.data;

    if (this.selectedCategory !== 'all') {
      filteredData = filteredData.filter((row: any) =>
        Object.values(row).some(value =>
          value?.toString().toLowerCase().includes(this.selectedCategory.toLowerCase())
        )
      );
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filteredData = filteredData.filter((row: any) =>
        Object.values(row).some(value =>
          value?.toString().toLowerCase().includes(term)
        )
      );
    }


    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return filteredData.slice(start, end);
  }

  get totalPages() {
    const table = this.tables[this.selectedTable];
    if (!table || !table.data) return 0;

    let filteredData = table.data;

    if (this.selectedCategory !== 'all') {
      filteredData = filteredData.filter((row: any) =>
        row.category?.toLowerCase() == this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filteredData = filteredData.filter((row: any) =>
        Object.values(row).some(value =>
          value?.toString().toLowerCase().includes(term)
        )
      );
    }

    return Math.ceil(filteredData.length / this.pageSize);
  }


  changePage(direction: 'next' | 'prev') {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getKeys(tableName: string): any {
    return Object.keys(this.tables[tableName].data[0]);
  }
}
