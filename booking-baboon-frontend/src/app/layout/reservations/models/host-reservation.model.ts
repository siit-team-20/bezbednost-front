import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {TimeSlot} from "../../accommodations/shared/models/timeslot.model";
import {Guest} from "../../users/models/guest.model";
import {ReservationStatus} from "./reservation-status.enum";

export interface HostReservation{
  id: number;
  accommodation: Accommodation;
  timeSlot: TimeSlot;
  guest: Guest;
  price: number;
  status: ReservationStatus;
  cancellationCount: number;
}
