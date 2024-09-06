import {Component, Input} from '@angular/core';
import {User} from "../../users/models/user.model";
import {UserService} from "../../users/services/user.service";
import {Review} from "../model/review.model";
import {AccommodationReviewService} from "../services/accommodation-review.service";
import {AccommodationService} from "../../accommodations/shared/services/accommodation.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReview} from "../model/host-review.model";
import { AccommodationReview } from '../model/accommodation-review.model';


@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review!: HostReview | AccommodationReview;
  reviewer!: User | null;
  isReviewedHost: boolean = false;
  isReviewReportShowing: boolean = false;
  currentReviewId!: number;

  constructor(private userService: UserService, private accommodationReviewService: AccommodationReviewService, private accommodationService: AccommodationService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.review.reviewer?.id) {
      this.userService.getUser(this.review.reviewer.id).subscribe({
        next: (data: User) => {
          this.reviewer = data;
          this.checkIfHost()
        },
        error: (_) => {
          console.log('Error fetching user data!');
        }
      });
    }
  }

  public getDateISOString(): string | null {
    if (this.review.createdOn) {
      return this.review.createdOn.split('T')[0];
    }
    return null;
  }

  checkIfHost() {
    //@ts-ignore
    if(this.review.reviewedAccommodation?.id)   {
        //@ts-ignore
        this.accommodationService.getAccommodation(this.review.reviewedAccommodation?.id).subscribe({
          next: value => {
            this.isReviewedHost = value.host?.id === this.authService.getId()
          }
        })
    }
    //@ts-ignore
    else if (this.review.reviewedHost?.id) {
      //@ts-ignore
        this.isReviewedHost = this.review.reviewedHost.id === this.authService.getId()
      }
  }

  onReviewReportClose() {
    this.isReviewReportShowing = false;
  }

  onReviewReportClick(reviewId: number) {
    this.currentReviewId = reviewId;
    this.isReviewReportShowing = true;
  }
}
