import {TimeSlot} from "../../accommodations/shared/models/timeslot.model";
import {AccommodationPeriodData} from "./AccommodationPeriodData";

export interface PeriodSummary{
  period: TimeSlot;
  accommodationsData: AccommodationPeriodData[];
}

