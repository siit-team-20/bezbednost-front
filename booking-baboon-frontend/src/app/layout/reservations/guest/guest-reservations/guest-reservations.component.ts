import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {ReservationStatus} from "../../models/reservation-status.enum";
import {AccommodationService} from "../../../accommodations/shared/services/accommodation.service";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent {

  reservations!: Reservation[]
  dataSource!: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['host', 'dates', 'accommodation', 'status', 'action'];
  isHostReviewShowing: boolean = false;
  isAccommodationReviewShowing: boolean = false;
  current_host_id!: number;
  current_accommodation_id!: number;
  tooltipMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isHostReportShowing: boolean = false;


  constructor(private reservationService: ReservationService,
              private authService: AuthService,
              private cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.reservationService.getAllForGuest(this.authService.getId()).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  getStatusColor(status: string): { [key: string]: string } {
    switch (status.toLowerCase()) {
      case 'approved':
        return { color: 'green' };
      case 'denied':
        return { color: 'red' };
      case 'finished':
        return { 'font-weight': 'bold'};
      case 'canceled':
        return { color: 'red' };
      default:
        return {};
    }
  }

  isReviewable(reservation: Reservation):boolean{
    const sevenDaysAgo = new Date(Date());
    sevenDaysAgo.setMilliseconds(sevenDaysAgo.getMilliseconds() - 7* 86400000);
    if (!reservation.timeSlot.endDate || !reservation.status) return false;
    return  new Date(reservation.timeSlot.endDate) >= sevenDaysAgo && !this.isStatusFinished(reservation.status.toString());

  }

  isStatusFinished(status: string): boolean {
    return status.toLowerCase() !== 'finished';
  }

  isCancellable(reservation: Reservation): boolean {
    let result = true;
    let status = reservation.status;
    let isStatusCancellable = (status.toString() == "Pending" || status.toString() == "Approved");
    if (isStatusCancellable && reservation.accommodation?.cancellationDeadline) {
      const deadlineDays: number = reservation.accommodation.cancellationDeadline;
      if (reservation.timeSlot.startDate) {
        const startDateEpochDay: number = new Date(reservation.timeSlot.startDate).getTime() / 86400000;
        if (startDateEpochDay - new Date().getTime() / 86400000 <= deadlineDays && status.toString() == "Approved") {
          //if deadline date has passed the guest cannot cancel
          result = false;
          this.tooltipMessage = 'Cancellation deadline has passed.';
        } else {
          this.tooltipMessage = 'test';
          result = true;
        }
      }
    } else{
      this.tooltipMessage = 'This reservation has already been denied/cancelled or has finished.';
      return false;
    }

    return result;
  }
  getTooltipMessage(reservation: Reservation): string {
    if (!this.isCancellable(reservation)) {
      return this.tooltipMessage; // Use the previously calculated message
    }

    // Calculate the message based on the current reservation
    let status = reservation.status;
    let isStatusCancellable = (status.toString() == "Pending" || status.toString() == "Approved");

    if (isStatusCancellable && reservation.accommodation?.cancellationDeadline) {
      const deadlineDays: number = reservation.accommodation.cancellationDeadline;
      if (reservation.timeSlot.startDate) {
        const startDateEpochDay: number = new Date(reservation.timeSlot.startDate).getTime() / 86400000;
        if (startDateEpochDay - new Date().getTime() / 86400000 <= deadlineDays && status.toString() == "Approved") {
          return 'Cancellation deadline has passed.';
        } else {
          return '';
        }
      }
    } else {
      return 'This reservation has already been denied/cancelled or has finished.';
    }
    return ""
  }

  onHostReviewClick(hostId: number) {
    this.current_host_id = hostId;
    this.isHostReviewShowing = true;
  }

  onCloseHostReview() {
    this.isHostReviewShowing = false;
  }

  onAccommodationReviewClick(accommodationId: number) {
    this.current_accommodation_id = accommodationId;
    this.isAccommodationReviewShowing = true;
  }

  onCloseAccommodationReview() {
    this.isAccommodationReviewShowing = false;
  }

  onCancelReservationClick(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe({
      next: (canceledReservation) => {
        // Optionally, you can perform other actions or show notifications.
        console.log('Reservation has been cancelled:', canceledReservation);

        // Refresh the entire page
        window.location.reload();
      },
      error: (err) => {
        console.error('Error cancelling reservation:', err);
      }
    });
  }

  onCloseHostReport() {
    this.isHostReportShowing = false;
  }

  onHostReportClick(hostId: number) {
    this.current_host_id = hostId;
    this.isHostReportShowing = true;
  }
}
