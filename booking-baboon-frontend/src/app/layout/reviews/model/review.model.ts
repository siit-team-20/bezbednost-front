import {User} from "../../users/models/user.model";
import {ReviewStatus} from "./review-status";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {Host} from "../../users/models/host.model";


export interface Review {
  reviewedAccommodation?: Accommodation;
  reviewedHost?: Host;
  id?: number;
  reviewer?: User;
  createdOn?: string;
  rating?: number;
  comment?: string;
  status?: ReviewStatus;
}
