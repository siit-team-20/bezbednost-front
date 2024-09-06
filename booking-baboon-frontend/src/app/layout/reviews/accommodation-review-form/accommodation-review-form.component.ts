import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReviewService} from "../services/host-review.service";
import {HostReview} from "../model/host-review.model";
import {AccommodationReviewService} from "../services/accommodation-review.service";
import {AccommodationReview} from "../model/accommodation-review.model";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-accommodation-review-form',
  templateUrl: './accommodation-review-form.component.html',
  styleUrls: ['./accommodation-review-form.component.css']
})
export class AccommodationReviewFormComponent {
  @Input() accommodationId!: number;
  public rating:number = 3;
  public starCount:number = 5;
  public reviewForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  @Output() closeReview: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReview.emit();
  }




  constructor(private authService: AuthService, private reviewService: AccommodationReviewService,private sharedService: SharedService) { }

  ngOnInit() {
  }
  onRatingChanged(rating: number){
    console.log(rating);
    this.rating = rating;
  }

  private getDateISOString(date: Date | null | undefined): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  submit() {
    if (!this.reviewForm.valid) return
    let review : AccommodationReview = {
      reviewer: {
        id: this.authService.getId()
      },
      createdOn: this.getDateISOString(new Date()),
      rating: this.rating,
      comment: this.reviewForm.get("comment")?.value,
      reviewedAccommodation: {
        id: this.accommodationId
      }
    }
    this.reviewService.create(review).subscribe({
      next: (data: AccommodationReview )=> {
        console.log(data);
        this.closeReview.emit();
      },
      error: (_) => {
        this.sharedService.openSnack("Review already exists!")
      }
    })
  }
}
