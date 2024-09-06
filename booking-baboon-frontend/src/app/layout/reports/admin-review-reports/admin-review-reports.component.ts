import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Reservation} from "../../reservations/models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservations/reservation.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {ReviewReport} from "../models/review-report.model";
import {ReviewReportService} from "../services/review-report.service";
import {Review} from "../../reviews/model/review.model";
import {ReviewService} from "../../reviews/services/review.service";
import {HostReviewService} from "../../reviews/services/host-review.service";
import {AccommodationReviewService} from "../../reviews/services/accommodation-review.service";

@Component({
  selector: 'app-admin-review-reports',
  templateUrl: './admin-review-reports.component.html',
  styleUrls: ['./admin-review-reports.component.css']
})
export class AdminReviewReportsComponent {
  reviewReports!: ReviewReport[]
  dataSource!: MatTableDataSource<ReviewReport>;
  displayedColumns: string[] = ['reportee', 'accommodation', 'created on', 'message', 'reviewer', 'comment', 'rating', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reviewReportService: ReviewReportService,
              private authService: AuthService,
              private reviewService: ReviewService,
              private hostReviewService: HostReviewService,
              private accommodationReviewService: AccommodationReviewService) {
  }

  ngOnInit(): void {
    this.reviewReportService.getAll().subscribe({
      next: (data: ReviewReport[]) => {
        this.reviewReports = data
        this.dataSource = new MatTableDataSource<ReviewReport>(this.reviewReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {console.log("Greska!")}
    })
  }


  onDeleteReviewReportClick(reviewReport: ReviewReport): void {
    if (reviewReport.id) {
      this.reviewReportService.remove(reviewReport.id).subscribe({
        next: (data: ReviewReport) => {

          if (reviewReport.reportedReview?.id) {

            if (reviewReport.reportedReview?.reviewedAccommodation?.id) {
              this.accommodationReviewService.remove(reviewReport.reportedReview.id).subscribe();
            }

            else if (reviewReport.reportedReview?.reviewedHost?.id) {
              this.hostReviewService.remove(reviewReport.reportedReview.id).subscribe();
            }
            window.location.reload();
          }
        }, error() {
        }
      });
    }

  }
}

