import {TimeSlot} from "../../accommodations/shared/models/timeslot.model";

export interface AccommodationMonthlySummary {
  accommodationId: number;
  timeSlot: TimeSlot;
  reservationsData: Record<string, number>;
  profitData: Record<string, number>;
}
