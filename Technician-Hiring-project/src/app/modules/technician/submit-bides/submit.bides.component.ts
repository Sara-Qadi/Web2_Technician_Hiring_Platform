import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit-bides',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './submit.bides.component.html',
  styleUrls: ['./submit.bides.component.css']
})
export class SubmitBidesComponent implements OnInit {
  min: number | null = null;
  max: number | null = null;
  comment: string = '';

  submissions: { min: number | null, max: number | null, comment: string }[] = [];

  ngOnInit(): void {
    // عند تحميل الصفحة: نقرأ من التخزين
    const saved = localStorage.getItem('bids');
    if (saved) {
      this.submissions = JSON.parse(saved);
    }
  }

  submitForm() {
    const newEntry = {
      min: this.min,
      max: this.max,
      comment: this.comment
    };

    // أضف للعناصر واعرضه
    this.submissions.unshift(newEntry);

    // خزّن البيانات في المتصفح
    localStorage.setItem('bids', JSON.stringify(this.submissions));

  }
}
