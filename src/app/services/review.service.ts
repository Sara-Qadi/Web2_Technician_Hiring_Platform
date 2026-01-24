import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Review {
  stars: number;
  text: string;
  user: string;
  date: string;
  img: string;
  helpful: number;
  avatar: string;
}

interface ReviewPayload {
  review_to: number;
  rating: number;
  review_comment?: string;
}

interface UserReviewsResponse {
  userName: string;
  reviews: Review[];
   average_rating: number;
}

@Injectable({
  providedIn: 'any'
})
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  submitReview(payload: ReviewPayload): Observable<any> {
  const token = localStorage.getItem('token');

  console.log('Payload to be sent:', payload); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  return this.http.post(`${this.apiUrl}/reviews`, payload, {
    headers: headers
  });
}

  getReviewsForUser(userId: number): Observable<UserReviewsResponse> {
    return this.http.get<UserReviewsResponse>(`${this.apiUrl}/users/${userId}/reviews`);
  }
  getUserAverageRating(userId: number): Observable<{ average_rating: number }> {
  return this.http.get<{ average_rating: number }>(`${this.apiUrl}/users/${userId}/average-rating`);
}

}

