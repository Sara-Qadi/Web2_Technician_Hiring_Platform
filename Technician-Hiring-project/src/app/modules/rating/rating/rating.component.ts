import { Component,OnInit } from '@angular/core';
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
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
export class RatingComponent implements OnInit {
   userId: number = 0;
  userName: string = '';
  reviews: Review[] = [];
  averageRating: number = 0;

  newReviewText = '';
  newReviewStars: number = 0;
  starHover: number = 0;
  submitting = false;
  showModal = false;

 

  selectedRating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    public toast: ToastService
  ) {}

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('userId');
    if (paramId) {
      this.userId = +paramId; 
      this.loadReviews();
      this.loadAverageRating();
    } else {
      console.error('userId is missing from route!');
    }
  }

  loadReviews(): void {
  this.reviewService.getReviewsForUser(this.userId).subscribe({
    next: (res) => {
      this.reviews = res.reviews ?? [];
      this.userName = res.userName;
      this.averageRating = res.average_rating ?? 0;
    },
    error: (err) => {
      console.error('Error loading reviews', err);
    }
  });
}
loadAverageRating(): void {
  this.reviewService.getUserAverageRating(this.userId).subscribe({
    next: (res) => {
      this.averageRating = res.average_rating ?? 0;
    },
    error: (err) => {
      console.error('Error loading average rating', err);
    }
  });
}


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
    rating: this.newReviewStars,
    review_comment: this.newReviewText.trim()
  };

  this.reviewService.submitReview(payload).subscribe({
    next: () => {
      this.loadReviews(); 
      this.submitting = false;
      this.newReviewStars = 0;
      this.newReviewText = '';
      this.closeModal();
      this.toast.show('Review submitted successfully!', 'success');
    },
    error: (err) => {
      console.error('fail', err);
      this.submitting = false;

      const msg = err?.error?.message || 'error!';
      this.toast.show( msg, 'danger');
    }
  });
}


  markHelpful(r: Review) {
    r.helpful++;
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

  get filteredComments(): Review[] {
    if (!this.reviews) return [];
    if (this.selectedRating === null) return this.reviews;
    return this.reviews.filter(r => r.stars === this.selectedRating);
  }

  setRatingFilter(rating: number | null) {
    this.selectedRating = rating;
  }
}