import {Component, Input, OnInit} from '@angular/core';
import {HostReview} from "../model/host-review.model";
import {HostReviewService} from "../services/host-review.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {AccommodationReview} from "../model/accommodation-review.model";
import {AccommodationReviewService} from "../services/accommodation-review.service";

@Component({
  selector: 'app-accommodation-review-cards',
  templateUrl: './accommodation-review-cards.component.html',
  styleUrls: ['./accommodation-review-cards.component.css']
})
export class AccommodationReviewCardsComponent implements OnInit{
  @Input() public reviews!: AccommodationReview[];
  constructor(private reviewService:AccommodationReviewService, private authService:AuthService) {

  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() : void{
    let id = this.authService.getId();
    if (id == undefined) return;
    this.reviewService.getReviewsByGuest(id).subscribe({
      next: (data: AccommodationReview[]) => {
        this.reviews = data;
        console.log(data)
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
