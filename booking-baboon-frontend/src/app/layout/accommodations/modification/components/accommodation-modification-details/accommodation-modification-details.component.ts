import {Component} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {Review} from "../../../../reviews/model/review.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {ImageService} from "../../../../../shared/images/image.service";
import {HostService} from "../../../../users/services/host.service";
import {AccommodationReviewService} from "../../../../reviews/services/accommodation-review.service";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";
import {Host} from "../../../../users/models/host.model";
import {AccommodationReview} from "../../../../reviews/model/accommodation-review.model";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {AccommodationModificationService} from "../../accommodation-modification.service";
import {AccommodationModificationType} from "../../model/accommodation-modification-type";

@Component({
  selector: 'app-accommodation-modification-details',
  templateUrl: './accommodation-modification-details.component.html',
  styleUrls: ['./accommodation-modification-details.component.css']
})
export class AccommodationModificationDetailsComponent {
  accommodationModification: AccommodationModification = {};
  amenities: string[] = ["Kitchen", "AC", "Free parking", "Wifi", "Balcony"];
  isFavorite = false;
  isLocationShowing: boolean = false;
  isReviewsShowing: boolean = false;
  loadedImages: string[] = [];
  averageRating!: number;
  ratingDisplay!: string;
  reviews!: Review[];
  accommodation!: Accommodation;

  constructor(private route: ActivatedRoute, private accommodationModificationService: AccommodationModificationService, private imageService: ImageService, private hostService: HostService, private accommodationReviewService: AccommodationReviewService, private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationModificationId'];
      const imageService: ImageService = this.imageService;
      let loadedImages: string[] = this.loadedImages;
      this.accommodationModificationService.get(id).subscribe({
        next: (data: AccommodationModification) => {
          this.accommodationModification = data;
          this.loadImages();
          this.loadHost();
          this.loadReviews();
          this.loadAverageRating();
          if (this.accommodationModification.accommodation?.id && this.accommodationModification.requestType == AccommodationModificationType.New)
          this.accommodationService.getAccommodation(this.accommodationModification.accommodation.id).subscribe({
            next(data: Accommodation) {
              if (data.images) {
                data.images.forEach((imageResponse: ImageResponse) => {
                  imageService.getImage(imageResponse.id).subscribe({
                    next: (imageContent: Blob) => { loadedImages.push(URL.createObjectURL(imageContent)); },
                    error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
                  });
                });
              }
            }
          })
        },
        error: (_) => { console.log("Error!"); }
      });
    });
  }

  loadImages(): void {
    if (this.accommodationModification.requestType == AccommodationModificationType.New) {
      if (this.accommodationModification.accommodation?.images) {
        this.accommodationModification.accommodation?.images.forEach((imageResponse: ImageResponse) => {
          this.imageService.getImage(imageResponse.id).subscribe({
            next: (imageContent: Blob) => { this.loadedImages.push(URL.createObjectURL(imageContent)); },
            error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
          });
        });
      }
    } else {
      if (this.accommodationModification.images) {
        this.accommodationModification.images.forEach((imageResponse: ImageResponse) => {
          this.imageService.getImage(imageResponse.id).subscribe({
            next: (imageContent: Blob) => { this.loadedImages.push(URL.createObjectURL(imageContent)); },
            error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
          });
        });
      }
    }
  }

  loadHost(): void {
    if(this.accommodationModification.host){
      this.hostService.getProfile(this.accommodationModification.host.id).subscribe({
        next: (host: Host) => { if(this.accommodationModification.host != undefined) {
          this.accommodationModification.host = host;
        }},
        error: (_) => { console.log("Error!"); }
      });
    }
  }

  loadAverageRating(): void{
    if(this.accommodationModification.accommodation){
      this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodationModification.accommodation.id).subscribe({
        next: (rating: number) => { this.averageRating = rating;
          if (this.averageRating == -1) {
            this.ratingDisplay = "no reviews";
          }
          else {
            this.ratingDisplay = String(rating);
          }},
        error: (_) => { console.log("Error!"); }
      })
    }
  }

  loadReviews(): void{
    this.accommodationReviewService.getAccommodationReviews(this.accommodationModification.accommodation?.id).subscribe({
      next: (data: AccommodationReview[]) => { this.reviews = data },
      error: (_) => {console.log("Error!")}
    })
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onShowLocationClick() {
    this.isLocationShowing = true;
  }
  onCloseLocation() {
    this.isLocationShowing = false;
  }

  onShowReviewsClick(){
    this.isReviewsShowing = true;
  }
  onCloseReviews() {
    this.isReviewsShowing = false;
  }




  getAddress(): string {
    let address = "";
    address += this.accommodationModification?.location?.address + ", "
    address += this.accommodationModification?.location?.city + ", "
    address += this.accommodationModification?.location?.country
    // return address;
    return "Bulevar oslobodjenja 5, Novi Sad";
  }

  protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;
}
