import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-reviews-feedback',
  templateUrl: './reviews-feedback.page.html',
  styleUrls: ['./reviews-feedback.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ReviewsFeedbackPage implements OnInit {
  reviews:any= [];
  newReview:any = {
    customerName: '',
    rating: 5,
    feedback: '',
    date: new Date().toISOString().split('T')[0],
  };
  constructor(private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    const data=this.apiService.getReviews();
    this.reviews = data.reviews;
  }
  submitReview() {
    // this.apiService.addReview(this.newReview).subscribe(() => {
      this.reviews.push({ ...this.newReview });
      this.alertService.showSnackbar('Review submitted successfully!', 'success');
      this.newReview = {
        customerName: '',
        rating: 5,
        feedback: '',
        date: new Date().toISOString().split('T')[0],
      };
    // });
  }

}
