import { Component } from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

interface Review {
  stars: number;
  text: string;
  user: string;
  date: string;
  color: string;
  item: string;
  img: string;
  helpful: number;
  rtl: boolean;
  avatar: string;
}

@Component({
  selector: 'app-rating',
  imports: [
    NgIf,
    NgClass,
    NgForOf,
    NgStyle,
    FormsModule,
    DecimalPipe,
    NavbarAdminComponent,
    FooterAdminComponent, 
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  metrics = [
    { title: 'Warranty Services : Above Expectation', value: 62, ltr: true },
    { title: 'سريع : Responsiveness', value: 85, ltr: false },
    { title: 'سريع : Item Functionality', value: 90, ltr: false }
  ];

  // Reviews
  reviews: Review[] = [
    {
      stars: 5,
      text: 'he was  extremely responsive (it’s great for managing daily tasks and time-sensitive work). I like it a lot and highly recommend it to anyone who values efficiency.',
      user: 'S***',
      date: 'April 2025',
      color: 'Purple/Contour lines',
      item: 'Ships From: CHINA',
      img: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'100\' viewBox=\'0 0 120 100\'%3E%3Crect width=\'120\' height=\'100\' fill=\'%23e5e7eb\'/%3E%3Cpath d=\'M40,30 L40,70 L45,70 L45,30 Z M50,30 L50,70 L55,70 L55,30 Z M60,30 L60,70 L65,70 L65,30 Z M70,30 L70,70 L75,70 L75,30 Z M80,30 L80,70 L85,70 L85,30 Z\' fill=\'%238b5cf6\'/%3E%3C/svg%3E',
      helpful: 0,
      rtl: false,
      avatar: '<span class="text-pink-800">S</span>'
    },
    {
      stars: 5,
      text: 'Perfect, I highly recommend him to everyone.',
      user: 'W***',
      date: 'April 2025',
      color: 'White Contour lines',
      item: 'Ships From: CHINA',
      img: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'100\' viewBox=\'0 0 120 100\'%3E%3Crect width=\'120\' height=\'100\' fill=\'%23e5e7eb\'/%3E%3Cpath d=\'M30,30 L90,30 L90,70 L30,70 Z\' fill=\'%23f9fafb\' stroke=\'%23d1d5db\' stroke-width=\'2\'/%3E%3C/svg%3E',
      helpful: 0,
      rtl: false,
      avatar: '<span class="text-white">W</span>'
    },
    {
      stars: 5,
      text: 'Very good, excellent performance and a great user interface .',
      user: 'B***',
      date: 'April 2025',
      color: 'White side engraved',
      item: 'Ships From: CHINA',
      img: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'100\' viewBox=\'0 0 120 100\'%3E%3Crect width=\'120\' height=\'100\' fill=\'%23312e81\'/%3E%3Cpath d=\'M30,30 L90,30 L90,70 L30,70 Z\' fill=\'%23f9fafb\' stroke=\'%23d1d5db\' stroke-width=\'2\'/%3E%3C/svg%3E',
      helpful: 0,
      rtl: false,
      avatar: `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23f87171'/%3E%3Ccircle cx='20' cy='17' r='7' fill='%23fff'/%3E%3Cpath d='M8,34 C8,27 14,22 20,22 C26,22 32,27 32,34 Z' fill='%23fff'/%3E%3C/svg%3E" width="40" height="40" />`
    }
  ];

  // Modal
  showModal = false;

  newReviewText = '';
  submitting = false;



  // Methods
  openModal() {
    this.showModal = true;
    this.newReviewStars = 0;
    this.newReviewText = '';
    this.starHover = 0;
  }
  closeModal() {
    this.showModal = false;
    this.submitting = false;
  }
  starHover: number = 0;
  newReviewStars: number = 0;

  hoverStars(stars: number) {
    this.starHover = stars;
  }

  clearHover() {
    this.starHover = 0;
  }

  setStars(stars: number) {
    this.newReviewStars = stars;
  }

  submitReview() {
    if (!this.newReviewStars || !this.newReviewText.trim()) return;
    this.submitting = true;
    setTimeout(() => {
      this.reviews.unshift({
        stars: this.newReviewStars,
        text: this.newReviewText,
        user: 'U***',
        date: 'أبريل 2025',
        color: 'Unknown',
        item: 'Unknown',
        img: '',
        helpful: 0,
        rtl: true,
        avatar: '<span class="text-primary">U</span>'
      });
      this.closeModal();
    }, 500);
  }

  markHelpful(r: any) {
    r.helpful++;
  }

  get averageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, r) => acc + r.stars, 0);
    return sum / this.reviews.length;
  }

  get filledStars(): number[] {
    return Array(Math.floor(this.averageRating)).fill(1);
  }

  get emptyStars(): number[] {
    return Array(5 - Math.floor(this.averageRating)).fill(1);
  }
  selectedRating: number | null = null;
  get filteredComments() {

    if (this.selectedRating === null) {
      return this.reviews;
    }
    return this.reviews.filter(r => r.stars === this.selectedRating);
  }

  setRatingFilter(rating: number | null) {
    this.selectedRating = rating;
  }

}
