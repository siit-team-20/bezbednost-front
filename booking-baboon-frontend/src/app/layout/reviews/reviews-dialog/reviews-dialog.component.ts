import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Review} from "../model/review.model";
import {HostReview} from "../model/host-review.model";

@Component({
  selector: 'app-reviews-dialog',
  templateUrl: './reviews-dialog.component.html',
  styleUrls: ['./reviews-dialog.component.css']
})
export class ReviewsDialogComponent {
  @Input() reviews!: Review[];

  @Output() closeReviews: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReviews.emit();
  }
}
