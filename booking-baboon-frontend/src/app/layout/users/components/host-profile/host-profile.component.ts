import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Host } from '../../models/host.model';
import { HostReview } from '../../../reviews/model/host-review.model';
import { HostReviewService } from '../../../reviews/services/host-review.service';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit, OnChanges, OnDestroy {
  @Input() host!: Host;
  ratingDisplay!: string;
  reviews: HostReview[] = [];
  isReviewsShowing: boolean = false;
  private reviewsSubscription: Subscription | undefined;

  constructor(private hostReviewService: HostReviewService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('host' in changes) {
      const newHost = changes['host'].currentValue as Host;
      if (newHost) {
        this.loadReviews(newHost.id);
      }
    }
  }

  ngOnInit() {
    if (this.host) {
      this.loadReviews(this.host.id);
    }
  }

  ngOnDestroy() {
    if (this.reviewsSubscription) {
      this.reviewsSubscription.unsubscribe();
    }
  }

  private loadReviews(hostId: number | undefined) {
    this.reviewsSubscription = this.hostReviewService.getReviewsByHost(hostId).subscribe({
      next: (data: HostReview[]) => {
        this.reviews = data;
        this.loadRatingDisplay();
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }

  private loadRatingDisplay() {
    let ratingSum = 0;
    let numberOfReviews = 0;

    this.reviews.forEach(review => {
      if (review.rating) {
        ratingSum += review.rating;
        numberOfReviews += 1;
      }
    });

    if (ratingSum > 0) {
      this.ratingDisplay = String(ratingSum / numberOfReviews);
    } else {
      this.ratingDisplay = "no reviews";
    }
  }

  onShowReviewsClick(){
    this.isReviewsShowing = true;
  }
  onCloseReviews() {
    this.isReviewsShowing = false;
  }
  onReviewClick() {
  }

  onReportClick() {
  }
}
