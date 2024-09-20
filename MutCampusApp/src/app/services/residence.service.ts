import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://192.168.101.237:3000';

  constructor(private http: HttpClient) { }

  getReviews() {
    return this.http.get(`${this.apiUrl}/reviews`);
  }

  addReview(review: any) {
    return this.http.post(`${this.apiUrl}/reviews`, review);
  }
}
