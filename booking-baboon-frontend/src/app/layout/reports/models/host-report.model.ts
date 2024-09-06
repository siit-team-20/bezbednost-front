import {Report} from "../../reports/models/report.model";
import {Host} from "@angular/core";

export interface HostReport extends Report{
  reportedHost: Host;
}
