




import { Component, AfterViewInit, ViewChild, ElementRef,OnInit } from '@angular/core';

import { NgClass, NgForOf ,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../admin/admin/footer-admin/footer-admin.component';
import { ReportcardComponent } from './reportcard/reportcard.component';
import { ReportsService } from '../../reportsServiec/reports.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TableData {
  headers: string[];
  keys: string[];
  data: any[];
}
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  standalone: true,
  imports: [NgForOf, FormsModule, NgClass, NavbarAdminComponent, FooterAdminComponent,ReportcardComponent,NgIf,HttpClientModule],

  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent  implements OnInit {
  selectedTable :string ='jobCompletion ';
  pageSize = 5;
  currentPage = 1;
  searchTerm='';
  selectedCategory: string = 'all';
  

  /*ngOnInit(): void {
    this.reportsService.getJobCompletion().subscribe({
      next: (data) => {
        this.jobCompletionData = data;
        console.log('Job Completion:', data);
      },
      error: (err) => {
        console.error('Error fetching job completion report:', err);
      }
    });
  }*/


 /* tables:any= {
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

  }*/



























tables: { [key: string]: TableData } = {
  jobCompletion: { headers: [], keys: [], data: [] },
  earnings: { headers: [], keys: [], data: [] },
  topRated: { headers: [], keys: [], data: [] },
  lowPerformance: { headers: [], keys: [], data: [] },
  monthlyActivity: { headers: [], keys: [], data: [] },
  topFinishers: { headers: [], keys: [], data: [] },
  locationDemand: { headers: [], keys: [], data: [] }
};

constructor(private reportsService: ReportsService) {}

ngOnInit(): void {
  this.selectedTable = 'jobCompletion'; 

 
  this.fetchAndMapReport('jobCompletion', this.reportsService.getJobCompletion());
  this.fetchAndMapReport('earnings', this.reportsService.getEarnings());
  this.fetchAndMapReport('topRated', this.reportsService.getTopRated());
  this.fetchAndMapReport('lowPerformance', this.reportsService.getLowPerformance());
  this.fetchAndMapReport('monthlyActivity', this.reportsService.getMonthlyActivity());
  this.fetchAndMapReport('topFinishers', this.reportsService.getTopFinishers());
  this.fetchAndMapReport('locationDemand', this.reportsService.getLocationDemand());
}

fetchAndMapReport(key: string, observable: Observable<any>) {
  observable.subscribe({
    next: (response: any) => {
      const headers: string[] = response.headers || [];
      const data: any[] = response.data || [];

      const keys = headers.map(h => this.convertToCamelCase(h));
      const mappedData = data.map((row: string[]) => {
        const rowObj: { [key: string]: string } = {};
        keys.forEach((key: string, i: number) => {
          rowObj[key] = row[i] || ''; 
        });
        return rowObj;
      });

      this.tables[key] = {
        headers,
        keys,
        data: mappedData
      };

      if (key === this.selectedTable) {
        this.currentPage = 1;
      }

      console.log(`${key} loaded`, this.tables[key]);
    },
    error: (err: any) => {
      console.error(`Error loading ${key}:`, err);
    }
  });
}

convertToCamelCase(header: string): string {
  return header
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}




// دالة إرجاع مفاتيح البيانات لعرضها في الجدول
getKeys(tableKey: string): string[] {
  const table = this.tables[tableKey];
  if (table && table.keys && table.keys.length) {
    return table.keys;
  }
  // fallback: keys من أول عنصر بيانات
  return table?.data?.length ? Object.keys(table.data[0]) : [];
}

// دالة إرجاع بيانات الصفحة الحالية مع البحث والتصفية
get paginatedData() {
  const table = this.tables[this.selectedTable];
  if (!table || !table.data) return [];

  let filteredData = table.data;

  // تصفية حسب التصنيف (مثلاً category)
  if (this.selectedCategory !== 'all') {
    filteredData = filteredData.filter((row: any) =>
      row.category?.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  // بحث نصي عام
  if (this.searchTerm.trim()) {
    const term = this.searchTerm.toLowerCase();
    filteredData = filteredData.filter((row: any) =>
      Object.values(row).some(value =>
        value?.toString().toLowerCase().includes(term)
      )
    );
  }

  // تقسيم الصفحة (pagination)
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return filteredData.slice(start, end);
}

// حساب عدد الصفحات الكلي بعد البحث والتصفية
get totalPages() {
  const table = this.tables[this.selectedTable];
  if (!table || !table.data) return 0;

  let filteredData = table.data;

  if (this.selectedCategory !== 'all') {
    filteredData = filteredData.filter((row: any) =>
      row.category?.toLowerCase() === this.selectedCategory.toLowerCase()
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
exportAll() {
    this.reportsService.exportAllReports().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'all_reports.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }


}