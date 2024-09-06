
import {AccommodationModificationStatus} from "./accommodation-modification-status";
import {AccommodationModificationType} from "./accommodation-modification-type";
import {AccommodationReference} from "../../shared/models/accommodationReference.model";
import {Host} from "../../../users/models/host.model";
import {Amenity} from "../../shared/models/amenity.model";
import {AvailablePeriod} from "../../shared/models/available-period.model";
import {AccommodationType} from "../../shared/models/accommodation-type.model";
import {ImageResponse} from "../../../../shared/images/imageResponse.model";
import {Location} from "../../shared/models/location.model";


export interface AccommodationModificationRequest {
  accommodation?: AccommodationReference;
  name?: string;
  description?: string;
  host?:  Host;
  location?: Location;
  amenities?: Amenity[];
  availablePeriods?: AvailablePeriod[];
  minGuests?: number;
  maxGuests?: number;
  isPricingPerPerson?: boolean;
  type?: AccommodationType;
  isAutomaticallyAccepted?: boolean;
  images?: ImageResponse[];
  requestType?: AccommodationModificationType;
}
