import {Component, Input, OnInit} from '@angular/core';
import {HostReview} from "../model/host-review.model";
import {HostService} from "../../users/services/host.service";
import {HostReviewService} from "../services/host-review.service";
import {Router} from "@angular/router";
import {AccommodationService} from "../../accommodations/shared/services/accommodation.service";
import {AccommodationReview} from "../model/accommodation-review.model";
import {AccommodationReviewService} from "../services/accommodation-review.service";

@Component({
  selector: 'app-accommodation-review-card',
  templateUrl: './accommodation-review-card.component.html',
  styleUrls: ['./accommodation-review-card.component.css']
})
export class AccommodationReviewCardComponent implements OnInit{
  @Input() public review!: AccommodationReview;
  public accommodationName!: String;

  constructor(private accommodationService: AccommodationService, private accommodationReviewService:AccommodationReviewService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.review.reviewedAccommodation?.id)
      this.accommodationService.getAccommodation(this.review.reviewedAccommodation?.id).subscribe({
        next: value => {
          if(value.name)
            this.accommodationName = value.name
        }
      })
  }


  deleteReview() {
    this.accommodationReviewService.remove(this.review.id).subscribe({
      next: value => {
        window.location.reload()
        this.router.navigate(['guest/'+this.review.reviewer+'/reviews'])
      }
    })
  }
}
