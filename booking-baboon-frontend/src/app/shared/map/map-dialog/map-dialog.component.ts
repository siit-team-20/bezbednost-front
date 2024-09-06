import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccommodationService} from "../../../layout/accommodations/shared/services/accommodation.service";
import {Accommodation} from "../../../layout/accommodations/shared/models/accommodation.model";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {
  @Input() address: string = "";

  @Output() closeLocation: EventEmitter<void> = new EventEmitter<void>();


  onCloseClick() {
    this.closeLocation.emit();
  }
}
