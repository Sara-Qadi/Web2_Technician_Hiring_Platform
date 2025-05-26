import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { JobdetailsComponent } from '../../job_owner/jobdetails/jobdetails.component';

@Component({
  selector: 'app-submit-bides',
  standalone: true,
  imports: [FormsModule , CommonModule, NavbarAdminComponent, FooterAdminComponent,JobdetailsComponent],
  templateUrl: './submit.bides.component.html',
  styleUrls: ['./submit.bides.component.css']
})
export class SubmitBidesComponent implements OnInit {
  showForm = false;
  toggleApply() {
    this.showForm = true;
  }
  Price: number | null = null;
  comment: string = '';

  submissions: { Price: number | null, comment: string }[] = [];

  ngOnInit(): void {
    // عند تحميل الصفحة: نقرأ من التخزين
    const saved = localStorage.getItem('bids');
    if (saved) {
      this.submissions = JSON.parse(saved);
    }
  }

  submitForm() {
    const newEntry = {
      Price: this.Price,
      comment: this.comment
    };

    // أضف للعناصر واعرضه
    this.submissions.unshift(newEntry);

    // خزّن البيانات في المتصفح
    localStorage.setItem('bids', JSON.stringify(this.submissions));
    this.Price = null;
    this.comment = '';
  }
}
