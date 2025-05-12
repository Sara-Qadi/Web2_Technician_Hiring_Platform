import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-reportcard',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './reportcard.component.html',
  styleUrl: './reportcard.component.css'
})
export class ReportcardComponent {
  summaryCards = [
    {
      title: 'New Artisans',
      value: 35,
      change: 5.2,
      icon: 'fa-users'
    },
    {
      title: 'Total Earnings',
      value: '$12,750',
      change: 3.7,
      icon: 'fa-dollar-sign'
    },
    {
      title: 'Completed Payments',
      value: 78,
      change: 4.1,
      icon: 'fa-credit-card'
    }

  ];
}