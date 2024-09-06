import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReportService} from "../services/host-report.service";
import {HostReport} from "../models/host-report.model";
import {ReportStatus} from "../models/report.model";
import {GuestReport} from "../models/guest-report.model";
import {GuestReportService} from "../services/guest-report.service";
import {ReviewReport} from "../models/review-report.model";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-guest-report-form',
  templateUrl: './guest-report-form.component.html',
  styleUrls: ['./guest-report-form.component.css']
})
export class GuestReportFormComponent implements OnInit{
  @Input() guestId!: number;


  public reportForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @Output() closeReport: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReport.emit();
  }




  constructor(private authService: AuthService, private reportService: GuestReportService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  private getDateISOString(date: Date | null | undefined): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  submit() {
    if (!this.reportForm.valid) return
    let report : GuestReport = {
      reportee: {
        id: this.authService.getId()
      },
      message: this.reportForm.get("message")?.value,
      createdOn: this.getDateISOString(new Date()),
      status: ReportStatus.Pending,
      reportedGuest: {
        id: this.guestId
      }
    }
    this.reportService.create(report).subscribe({
      next: (data: GuestReport )=> {
        console.log(data);
        this.closeReport.emit();
      },
      error: (_) => {
        this.sharedService.openSnack("Report already exists!")
      }
    })
  }
}
