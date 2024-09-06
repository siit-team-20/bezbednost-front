import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SummaryService} from "../../summary.service";
import {PeriodSummary} from "../../models/PeriodSummary";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {AccommodationPeriodData} from "../../models/AccommodationPeriodData";

@Component({
  selector: 'app-period-summary-dialog',
  templateUrl: './period-summary-dialog.component.html',
  styleUrls: ['./period-summary-dialog.component.css']
})
export class PeriodSummaryDialogComponent implements OnInit{
  @Input() periodSummary?: PeriodSummary;
  dataSource!: MatTableDataSource<AccommodationPeriodData>;
  displayedColumns: string[] = ['accommodation', 'reservations', 'profit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() closePeriodSummary: EventEmitter<void> = new EventEmitter<void>();

  constructor(private summaryService: SummaryService,private authService:AuthService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AccommodationPeriodData>(this.periodSummary?.accommodationsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCloseClick() {
    this.closePeriodSummary.emit();
  }

  onDownloadPdfClick(){
    const hostId = this.authService.getId();
    const startDate = this.periodSummary?.period.startDate;
    const endDate = this.periodSummary?.period.endDate;

    if(hostId && startDate && endDate)
    this.summaryService
      .getPeriodSummaryPdf(hostId, startDate, endDate)
      .subscribe({
      next:(blob: Blob) => {

        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'period_summary.pdf';

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(blobUrl);
     }});
  }

}

