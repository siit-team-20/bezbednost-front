import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {GuestReportService} from "../services/guest-report.service";
import {GuestReport} from "../models/guest-report.model";
import {ReportStatus} from "../models/report.model";
import {ReviewReportService} from "../services/review-report.service";
import {ReviewReport} from "../models/review-report.model";
import {AccommodationReview} from "../../reviews/model/accommodation-review.model";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-review-report-form',
  templateUrl: './review-report-form.component.html',
  styleUrls: ['./review-report-form.component.css']
})
export class ReviewReportFormComponent {
  @Input() reviewId!: number;


  public reportForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @Output() closeReport: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReport.emit();
  }




  constructor(private authService: AuthService, private reportService: ReviewReportService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  private getDateISOString(date: Date | null | undefined): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  submit() {
    if (!this.reportForm.valid) return
    let report : ReviewReport = {
      reportee: {
        id: this.authService.getId()
      },
      message: this.reportForm.get("message")?.value,
      createdOn: this.getDateISOString(new Date()),
      status: ReportStatus.Pending,
      reportedReview: {
        id: this.reviewId
      }
    }
    this.reportService.create(report).subscribe({
      next: (data: ReviewReport )=> {
        console.log(data);
        this.closeReport.emit();
      },
      error: (_) => {
        this.sharedService.openSnack("Report already exists!")
      }
    })
  }
}
