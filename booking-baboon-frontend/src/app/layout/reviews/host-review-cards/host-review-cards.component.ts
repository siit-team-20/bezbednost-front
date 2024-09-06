import {Component, Input, OnInit} from '@angular/core';
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {AccommodationService} from "../../accommodations/shared/services/accommodation.service";
import {HostService} from "../../users/services/host.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReview} from "../model/host-review.model";
import {HostReviewService} from "../services/host-review.service";

@Component({
  selector: 'app-host-review-cards',
  templateUrl: './host-review-cards.component.html',
  styleUrls: ['./host-review-cards.component.css']
})
export class HostReviewCardsComponent implements OnInit{
  @Input() public reviews!: HostReview[];
  constructor(private reviewService:HostReviewService, private authService:AuthService) {

  }

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations() : void{
    let id = this.authService.getId();
    if (id == undefined) return;
    this.reviewService.getReviewsByGuest(id).subscribe({
      next: (data: HostReview[]) => {
        this.reviews = data;
        console.log(data)
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
