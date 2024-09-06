import {User} from "../../users/models/user.model";
import {ReportStatus} from "./report.model";
import {Guest} from "../../users/models/guest.model";
import {Host} from "../../users/models/host.model";

export interface UserReport extends Report{
  reportedGuest?: Guest;
  reportedHost?: Host;
}
