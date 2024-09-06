import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccommodationReviewService} from "../../../../reviews/services/accommodation-review.service";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {SharedService} from "../../../../../shared/shared.service";
import {AccommodationModificationService} from "../../accommodation-modification.service";
import {AccommodationModificationStatus} from "../../model/accommodation-modification-status";
import {Host} from "../../../../users/models/host.model";
import {HostService} from "../../../../users/services/host.service";
import {AccommodationModificationType} from "../../model/accommodation-modification-type";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";
import {ImageService} from "../../../../../shared/images/image.service";

@Component({
  selector: 'app-accommodation-modification-card',
  templateUrl: './accommodation-modification-card.component.html',
  styleUrls: ['./accommodation-modification-card.component.css']
})
export class AccommodationModificationCardComponent {
  protected readonly AccommodationModificationStatus = AccommodationModificationStatus;
  @Input()
  accommodationModification!: AccommodationModification;
  rating!: number;
  date: string= "";
  ratingDisplay!: string;
  loadedImages: string[] = [];
  accommodation!: Accommodation;
  constructor(private route: ActivatedRoute, private accommodationReviewService: AccommodationReviewService,
              private accommodationService : AccommodationService,
              private hostService : HostService,
              private sharedService : SharedService,
              private accommodationModificationService: AccommodationModificationService,
              private imageService: ImageService) {
  }
  ngOnInit(): void {
    if (this.accommodationModification !== undefined) {
      this.route.params.subscribe((params) => {
        const accommodationId = this.accommodationModification.accommodation?.id;

        if (accommodationId) {
          this.accommodationService.getAccommodation(accommodationId).subscribe({
            next: (data: Accommodation) => {
              if (this.accommodationModification.accommodation != undefined) {
                this.accommodation = data;
                this.parseDate();
                this.loadHost();
                this.getAverageRating();
                this.loadImages(); // Move loadImages inside this block
              }
            },
            error: (_) => {
              console.log("Error!");
            }
          });
        }
      });
    }
  }
  private parseDate() {
    let new_Date: Date = new Date();
    let result: string = new_Date.toLocaleString();
    result = new_Date.toLocaleString("en-UK");
    this.date = result;
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

  loadImages(): void {
    if (this.accommodationModification.requestType == AccommodationModificationType.New) {
      if (this.accommodation.images) {
        this.accommodation.images.forEach((imageResponse: ImageResponse) => {
          this.imageService.getImage(imageResponse.id).subscribe({
            next: (imageContent: Blob) => { this.loadedImages.push(URL.createObjectURL(imageContent)); },
            error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
          });
        });
      }
    } else {
      console.log(this.accommodationModification)
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
  getAverageRating(): void {
    this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodationModification.accommodation?.id!).subscribe({
      next: (rating: number) => { this.rating = rating;
        if (this.rating == -1) {
          this.ratingDisplay = "no reviews";
        }
        else {
          this.ratingDisplay = String(rating);
        }},
      error: (_) => { console.log("Error!"); }
    });
  }
  onClickButtonApprove(): void {
    let newAccommodation: Accommodation = {
      name: this.accommodationModification.name,
      description: this.accommodationModification.description,
      host: this.accommodationModification.host,
      location: this.accommodationModification.location,
      amenities: this.accommodationModification.amenities,
      availablePeriods: this.accommodationModification.availablePeriods,
      minGuests: this.accommodationModification.minGuests,
      maxGuests: this.accommodationModification.maxGuests,
      isPricingPerPerson: this.accommodationModification.isPricingPerPerson,
      type: this.accommodationModification.type,
      isAutomaticallyAccepted: this.accommodationModification.isAutomaticallyAccepted,
      images: this.accommodation.images,
      isBeingEdited: false,
    };

    if (this.accommodationModification.requestType == AccommodationModificationType.Edited) {
      newAccommodation.id = this.accommodationModification.accommodation?.id
      this.updateAccommodation(newAccommodation);
    }
    else {
      this.createAccommodation(newAccommodation);
    }
  }
  private updateAccommodation(newAccommodation: Accommodation) {
    newAccommodation.id = this.accommodation.id;
    this.accommodationService.update(newAccommodation).subscribe({
      next: (accommodationResponse : Accommodation) => {
        //TODO: UPDATE IMAGES AND AVAILABLE PERIODS
        this.approveRequest();
      },
      error: (_) => {this.sharedService.openSnack("An error occured!")}
    })
  }

  private createAccommodation(newAccommodation: Accommodation) {
    if (this.accommodationModification.accommodation?.id)
    this.accommodationService.updateEditingStatus(this.accommodationModification.accommodation.id, false).subscribe({
      next: () => {
        this.approveRequest();
      },
      error: (_) => {this.sharedService.openSnack("An error occured!")}
    })
  }
  private approveRequest() {
    if (this.accommodationModification.id != undefined) {
      this.accommodationModificationService.approve(this.accommodationModification?.id).subscribe({
        next: (accommodationModification: AccommodationModification) => {
          this.accommodationModification.status = AccommodationModificationStatus.Approved;
          this.sharedService.openSnack("Modification approved!");
        }
      })
    }
  }
  denyRequest(): void {
    const accommodationService = this.accommodationService;
    const accommodationModification = this.accommodationModification;
    if (this.accommodationModification.id != undefined) {
      this.accommodationModificationService.deny(this.accommodationModification?.id).subscribe({
        next: (accommodationModification: AccommodationModification) => {
          if (this.accommodationModification.accommodation?.id) {
            this.denyNewRequest(accommodationService, accommodationModification);
            this.accommodationService.updateEditingStatus(this.accommodationModification.accommodation.id, false).subscribe();
          }
          this.accommodationModification.status = AccommodationModificationStatus.Denied;
          this.sharedService.openSnack("Modification denied!");
        }
      })
    }
  }

  private denyNewRequest(accommodationService: AccommodationService, accommodationModification: AccommodationModification) {
    if (this.accommodationModification.requestType == AccommodationModificationType.New && this.accommodationModification?.id) {
      this.accommodationModificationService.delete(this.accommodationModification.id).subscribe({
        next(data: AccommodationModification) {
          if (accommodationModification.accommodation?.id)
            accommodationService.delete(accommodationModification.accommodation.id).subscribe({
              next(data: Accommodation) {

              }
            })
        }
      })
    }
  }
}

