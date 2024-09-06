import {Component, Input} from '@angular/core';
import {AccommodationReview} from "../model/accommodation-review.model";
import {Review} from "../model/review.model";
import {HostReview} from "../model/host-review.model";

@Component({
  selector: 'app-review-cards',
  templateUrl: './review-cards.component.html',
  styleUrls: ['./review-cards.component.css']
})
export class ReviewCardsComponent {
  @Input() reviews!: Review[];
}
