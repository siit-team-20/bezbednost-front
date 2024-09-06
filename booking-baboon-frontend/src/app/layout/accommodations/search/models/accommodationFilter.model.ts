import {AccommodationType} from "../../shared/models/accommodation-type.model";

export interface AccommodationFilter{
  city?: string;
  checkin?: string | null;
  checkout?: string | null;
  guestNum?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  types?: AccommodationType[];
  minRating?: number;
}
