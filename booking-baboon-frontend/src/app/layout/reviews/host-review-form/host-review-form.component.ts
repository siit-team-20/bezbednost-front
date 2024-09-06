import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationType} from "../../accommodations/shared/models/accommodation-type.model";
import {HostReview} from "../model/host-review.model";
import {User} from "../../users/models/user.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReviewService} from "../services/host-review.service";
import {SnackBarComponent} from "../../../shared/snack-bar/snack-bar.component";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-host-review-form',
  templateUrl: './host-review-form.component.html',
  styleUrls: ['./host-review-form.component.css']
})
export class HostReviewFormComponent implements OnInit{

  @Input() hostId!: number;
  public rating:number = 3;
  public starCount:number = 5;
  public reviewForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  @Output() closeReview: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReview.emit();
  }




  constructor(private authService: AuthService, private reviewService: HostReviewService, private sharedService: SharedService) { }

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
    let review : HostReview = {
      reviewer: {
        id: this.authService.getId()
      },
      createdOn: this.getDateISOString(new Date()),
      rating: this.rating,
      comment: this.reviewForm.get("comment")?.value,
      reviewedHost: {
        id: this.hostId
      }
    }
    this.reviewService.create(review).subscribe({
      next: (data: HostReview )=> {
        console.log(data);
        this.closeReview.emit();
      },
      error: (_) => {
        this.sharedService.openSnack("Review already exists!")
      }
    })

  }

}
