import { Component,OnInit } from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ReviewService } from '../../../services/review.service';
interface Review {
 id?: number;
  stars: number;
  text: string;
  user: string;
  date: string;
  img: string;
  helpful: number;
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
export class RatingComponent implements OnInit{
  userId: number = 3;
  userName: string = '';
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    if (!this.userId) {
      console.error('userId is not set!');
      return;
    }

    this.reviewService.getReviewsForUser(this.userId).subscribe({
  next: (res) => {
    this.userName = res.userName;
    this.reviews = res.reviews ?? [];
  },
  error: (err) => console.error('fail to get', err)
});

  }

  newReviewText = '';
  newReviewStars: number = 0;
  starHover: number = 0;
  submitting = false;
  showModal = false;

  
  jobpostId: number = 10;

  openModal() {
    this.showModal = true;
    this.newReviewText = '';
    this.newReviewStars = 0;
    this.starHover = 0;
  }

  closeModal() {
    this.showModal = false;
    this.submitting = false;
  }

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

    const payload = {
      review_to: this.userId,
      jobpost_id: this.jobpostId,
      rating: this.newReviewStars,
      review_comment: this.newReviewText.trim()
    };

    this.reviewService.submitReview(payload).subscribe({
      next: (res) => {
        this.reviews.unshift({
          
          stars: this.newReviewStars,
          text: this.newReviewText.trim(),
          user: res.userName ?? 'user',
          date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long' }),
          img: '',
          helpful: 0,
          avatar: `<span class="text-primary">${(res.userName?.charAt(0) || 'U')}</span>`
        });
        this.closeModal();
      },
      error: (err) => {
        console.error('fail', err);
        this.submitting = false;
      }
    });
  }

  markHelpful(r: Review) {
    r.helpful++;
  }

  get averageRating(): number {
    if (!this.reviews || this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((sum, review) => sum + review.stars, 0);
    return total / this.reviews.length;
  }

 get filledStars(): number[] {
  const rating = Math.floor(this.averageRating);
  return rating > 0 ? Array(rating).fill(1) : [];
}


 get emptyStars(): number[] {
  const rating = Math.floor(this.averageRating);
  const remaining = 5 - rating;
  return remaining > 0 ? Array(remaining).fill(1) : [];
}


  selectedRating: number | null = null;
  get filteredComments(): Review[] {
    if (!this.reviews) return [];
    if (this.selectedRating === null) return this.reviews;
    return this.reviews.filter(r => r.stars === this.selectedRating);
  }

  setRatingFilter(rating: number | null) {
    this.selectedRating = rating;
  }

 
}