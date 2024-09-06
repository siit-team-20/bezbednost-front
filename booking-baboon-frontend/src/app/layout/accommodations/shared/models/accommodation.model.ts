import {Location} from "./location.model";
import {Amenity} from "./amenity.model";
import {AvailablePeriod} from "./available-period.model";
import {AccommodationType} from "./accommodation-type.model";
import {ImageResponse} from "../../../../shared/images/imageResponse.model";
import {Host} from "../../../users/models/host.model";


export interface Accommodation {
  id?: number;
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
  isBeingEdited?: Boolean;
  cancellationDeadline?: number;
}
