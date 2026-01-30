import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReportsService } from '../../../../services/report-user.service';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { FooterAdminComponent } from "../footer-admin/footer-admin.component";
@Component({
  selector: 'app-manage-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NavbarAdminComponent,
    FooterAdminComponent
],
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.css']
})

export class ManageReportsComponent implements OnInit {

  reports: any[] = [];
  filteredReports: any[] = [];
  searchQuery = '';
  loading = false;
  errorMessage = '';

  constructor(private ReportsService : ReportsService) {}

  ngOnInit(): void {
    this.getReports();
  }
getReports() {
  this.loading = true;

  this.ReportsService.getAllReports().subscribe({
    next: (res) => {
      // استخدام res.data لأنه Pagination object
      this.reports = res.data.map((r: any) => ({
        ...r,
        reporter_name: r.reporter?.user_name || '-',
        reported_user_name: r.reportable?.user_name || '-'
      }));

      this.filteredReports = [...this.reports];
      this.loading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to load reports';
      this.loading = false;
    }
  });
}


  onSearchChange() {
    const q = this.searchQuery.toLowerCase();

    this.reports = this.filteredReports.filter(r =>
      r.reported_user_name.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q)
    );
  }

   deleteReport(id: number) {
    if (!confirm('Are you sure you want to delete this report?')) return;

    this.ReportsService.deleteReport(id).subscribe({
      next: () => {
        this.reports = this.reports.filter(r => r.id !== id);
        this.filteredReports = this.filteredReports.filter(r => r.id !== id);
        alert('Report deleted successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete report');
      }
    });
  }
}
