import {ReservationStatus} from "../models/reservation-status.enum";
import {Reservation} from "../models/reservation.model";
import {ReservationRequest} from "../models/reservation-request.model";

const mockReservationRequest1: ReservationRequest = {
  accommodation: {
    id: 1
  },
  timeSlot: {
    startDate: '2024-04-15',
    endDate: '2024-04-20'
  },
  guest: {
    id: 5
  },
  price: 200
};

const mockReservation1: Reservation = {
  id: 1,
  accommodation: {
    id: 1
  },
  timeSlot: {
    startDate: '2024-04-15',
    endDate: '2024-04-20'
  },
  guest: {
    id: 5
  },
  status: ReservationStatus.Pending,
  price: 200
};

const mockReservation2: Reservation = {
  id: 2,
  accommodation: {
    id: 1
  },
  timeSlot: {
    startDate: '2024-05-18',
    endDate: '2024-05-22'
  },
  guest: {
    id: 5
  },
  status: ReservationStatus.Approved,
  price: 300
};

const mockReservation3: Reservation = {
  id: 3,
  accommodation: {
    id: 1
  },
  timeSlot: {
    startDate: '2024-01-05',
    endDate: '2024-01-15'
  },
  guest: {
    id: 5
  },
  status: ReservationStatus.Finished,
  price: 800
};

const mockCancellationCount5 = 4;

const mockReservationArray: Reservation[] = [mockReservation1, mockReservation2, mockReservation3];

export { mockReservationRequest1, mockReservation1, mockReservation2, mockReservation3, mockReservationArray, mockCancellationCount5};
