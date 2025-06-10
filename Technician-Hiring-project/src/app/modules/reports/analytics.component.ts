




import { Component, AfterViewInit, ViewChild, ElementRef,OnInit } from '@angular/core';

import { NgClass, NgForOf ,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../admin/admin/footer-admin/footer-admin.component';
import { ReportcardComponent } from './reportcard/reportcard.component';
import { ReportsService } from '../../reportsServiec/reports.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

interface TableData {
  headers: string[];
  keys: string[];
  data: any[];
}
interface ReportOption {
  value: string;
  label: string;
}
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  standalone: true,
  imports: [NgForOf, FormsModule, NgClass, NavbarAdminComponent, FooterAdminComponent,ReportcardComponent,NgIf,HttpClientModule],

  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent  implements OnInit {
  selectedTable :string ='jobCompletion';
  pageSize = 5;
  currentPage = 1;
  searchTerm='';
  selectedCategory: string = 'all';
  
  userRoleId: number = 2; 

  allOptions: ReportOption[] = [
    { value: 'jobCompletion', label: 'Job Completion Report' },
    { value: 'earnings', label: 'Earnings Report' },
    { value: 'topRated', label: 'Top Rated Artisans Report' },
    { value: 'lowPerformance', label: 'Low Performance Users Report' },
    { value: 'monthlyActivity', label: 'Monthly Activity Report' },
    { value: 'locationDemand', label: 'Location Based Demand Report' },
    { value: 'topFinishers', label: 'top Finishers Report' }
  ];
filteredOptions: ReportOption[] = [];
tables: { [key: string]: TableData } = {
  jobCompletion: { headers: [], keys: [], data: [] },
  earnings: { headers: [], keys: [], data: [] },
  topRated: { headers: [], keys: [], data: [] },
  lowPerformance: { headers: [], keys: [], data: [] },
  monthlyActivity: { headers: [], keys: [], data: [] },
  topFinishers: { headers: [], keys: [], data: [] },
  locationDemand: { headers: [], keys: [], data: [] }
};


constructor(private reportsService: ReportsService, private profileService: ProfileService) {}

ngOnInit(): void {
  this.selectedTable = 'jobCompletion'; 

  this.loadUserRole();  // جلب الدور من السيرفر فقط

  // جلب التقارير (يمكن تحريكها بعد تحميل الدور لو تريد)
  this.fetchAndMapReport('jobCompletion', this.reportsService.getJobCompletion());
  this.fetchAndMapReport('earnings', this.reportsService.getEarnings());
  this.fetchAndMapReport('topRated', this.reportsService.getTopRated());
  this.fetchAndMapReport('lowPerformance', this.reportsService.getLowPerformance());
  this.fetchAndMapReport('monthlyActivity', this.reportsService.getMonthlyActivity());
  this.fetchAndMapReport('topFinishers', this.reportsService.getTopFinishers());
  this.fetchAndMapReport('locationDemand', this.reportsService.getLocationDemand());
}

filterOptionsByRole() {
  const role = this.userRoleId;
  if (role === 1) {
    this.filteredOptions = this.allOptions;
  } else if (role === 2) {
    this.filteredOptions = this.allOptions.filter(opt =>
      ['jobCompletion', 'earnings', 'topRated'].includes(opt.value)
    );
  } else if (role === 3) {
    this.filteredOptions = this.allOptions.filter(opt =>
      ['topRated', 'monthlyActivity'].includes(opt.value)
    );
  } else {
    this.filteredOptions = [];
  }
  console.log('Filtered Options:', this.filteredOptions);
}

loadUserRole() {
  this.profileService.getProfile()
    .pipe(
      catchError(err => {
        console.error('Failed to fetch profile', err);
        return of(null);
      })
    )
    .subscribe(profile => {
      if (profile && profile.user_id) {
        this.profileService.getUserById(profile.user_id)
          .pipe(
            catchError(err => {
              console.error('Failed to fetch user', err);
              return of(null);
            })
          )
          .subscribe(user => {
            if (user) {
              this.userRoleId = user.role_id;
              console.log('User role loaded:', this.userRoleId);
              this.filterOptionsByRole(); // استدعي الفلترة بعد تحميل الدور
            }
          });
      } else {
        console.warn('Profile does not contain user_id');
      }
    });
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

getRoleFromToken(): number {
  const token = localStorage.getItem('token');
  if (!token) return 0;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role_id || 0;
  } catch {
    return 0;
  }
}


getKeys(tableKey: string): string[] {
  const table = this.tables[tableKey];
  if (table && table.keys && table.keys.length) {
    return table.keys;
  }
  return table?.data?.length ? Object.keys(table.data[0]) : [];
}

get paginatedData() {
  const table = this.tables[this.selectedTable];
  if (!table || !table.data) return [];

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
  this.reportsService.exportAllReports().subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'all_reports.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    },
    error: async (err: any) => {
      if (err.error instanceof Blob) {
        const text = await err.error.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch(e) {
          console.error('Error parsing JSON error:', text);
        }
        console.error('Server-side error:', json ?? text);
      } else {
        console.error('Unknown error:', err);
      }
    }
  });
}

}