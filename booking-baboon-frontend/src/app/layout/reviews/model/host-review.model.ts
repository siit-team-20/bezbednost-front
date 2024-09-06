import {Review} from "./review.model";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {Host} from "../../users/models/host.model";

export interface HostReview extends Review {
  reviewedHost?: Host;
}
