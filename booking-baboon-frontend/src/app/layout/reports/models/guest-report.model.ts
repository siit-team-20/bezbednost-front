import {Report} from "../../reports/models/report.model";
import {Guest} from "../../users/models/guest.model";
export interface GuestReport extends Report{
  reportedGuest: Guest;
}
