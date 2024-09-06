import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccommodationMonthlySummary} from "../../models/AccommodationMonthlySummary";
import {SummaryService} from "../../summary.service";
import {AccommodationService} from "../../../accommodations/shared/services/accommodation.service";
import {Accommodation} from "../../../accommodations/shared/models/accommodation.model";

@Component({
  selector: 'app-monthly-summary-dialog',
  templateUrl: './monthly-summary-dialog.component.html',
  styleUrls: ['./monthly-summary-dialog.component.css']
})
export class MonthlySummaryDialogComponent implements OnInit{

  @Input() accommodationId?: number;
  summaryData!: AccommodationMonthlySummary;
  accommodation!: Accommodation;
  constructor(private summaryService: SummaryService, private accomodationService: AccommodationService) {
  }
  ngOnInit(): void {
    this.summaryService.getMonthlySummary(this.accommodationId).subscribe({
      next:(data: AccommodationMonthlySummary) => {
        this.summaryData = data;

        this.accomodationService.getAccommodation(this.summaryData.accommodationId).subscribe({
          next:(accommodation: Accommodation) => {
            this.accommodation = accommodation;
          }
        });
      }
    })
  }

  @Output() closeMonthlySummary: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeMonthlySummary.emit();
  }


  onDownloadPdfClick(){
    if(this.accommodationId)
      this.summaryService
        .getMonthlySummaryPdf(this.accommodationId)
        .subscribe({
          next:(blob: Blob) => {

            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'monthly_summary.pdf';

            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);

            URL.revokeObjectURL(blobUrl);
          }});
  }

}

