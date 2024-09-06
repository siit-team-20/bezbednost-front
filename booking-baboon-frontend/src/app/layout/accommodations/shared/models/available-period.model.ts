import {TimeSlot} from "./timeslot.model";

export interface AvailablePeriod{
  id?: number;
  timeSlot?: TimeSlot;
  pricePerNight?: number;
}
