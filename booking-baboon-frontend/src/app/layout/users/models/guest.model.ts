import {User} from "./user.model";
import {NotificationType} from "./NotificationType.module";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";

export interface Guest extends User{
  favorites?: Accommodation[]
}
