import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationReviewService} from "../../../../reviews/services/accommodation-review.service";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";
import {ImageService} from "../../../../../shared/images/image.service";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {AccommodationFilter} from "../../../search/models/accommodationFilter.model";

@Component({
  selector: 'app-host-accommodation-card',
  templateUrl: './host-accommodation-card.component.html',
  styleUrls: ['./host-accommodation-card.component.css']
})
export class HostAccommodationCardComponent implements OnInit{

  @Input() accommodation!: Accommodation;

  accommodationLocation: string | undefined;
  rating: number | undefined;
  ratingDisplay: string | undefined;
  loadedImages: string[] = [];
  autoAccept: undefined | boolean;
  isSummaryShowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accommodationReviewService: AccommodationReviewService,
    private imageService: ImageService,
    private accommodationService: AccommodationService
    ) {
  }

  ngOnInit(): void {
    if (this.accommodation) {
      console.log(this.accommodation);
      this.autoAccept = this.accommodation.isAutomaticallyAccepted;
      console.log(this.autoAccept)


      this.route.params.subscribe((params) => {
        this.loadImages();
        this.accommodationLocation = this.accommodation.location?.address + ", " + this.accommodation.location?.city + ", " + this.accommodation.location?.country;
        this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodation.id!).subscribe({
          next: (rating: number) => { this.rating = rating;
            if (this.rating == -1) {
              this.ratingDisplay = "no reviews";
            }
            else {
              this.ratingDisplay = String(rating);
            }},
          error: (_) => { console.log("Error!"); }
        });
      });

    }
  }

  loadImages(): void {
    if (this.accommodation.images) {
      this.accommodation.images.forEach((imageResponse: ImageResponse) => {
        this.imageService.getImage(imageResponse.id).subscribe({
          next: (imageContent: Blob) => { this.loadedImages.push(URL.createObjectURL(imageContent)); },
          error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
        });
      });
    }
  }

  toggleAutoAccept() {
    this.autoAccept = !this.autoAccept;
    this.accommodation.isAutomaticallyAccepted = this.autoAccept;
    this.accommodationService.setAutoAccepts(this.accommodation.id, this.autoAccept).subscribe({
      next: (data: Accommodation) => {
      },
      error: (_) => { console.log("Error!"); }
    });
  }

  showSummaryDialog() {
    this.isSummaryShowing = true;
  }

  onCloseSummary() {
    this.isSummaryShowing = false;
  }

}
