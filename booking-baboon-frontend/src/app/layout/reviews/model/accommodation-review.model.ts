import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {Review} from "./review.model";

enum AccommodationType {
  Hotel,
  Hostel,
  BedAndBreakfast,
  Resort,
  Motel,
  Apartment,
  House,
  Room,
  Tent
}

export interface AccommodationReview extends Review {
  reviewedAccommodation?: Accommodation;
}
