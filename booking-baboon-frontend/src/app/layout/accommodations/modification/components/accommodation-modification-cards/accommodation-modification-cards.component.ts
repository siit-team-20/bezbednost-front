import {Component, Input} from '@angular/core';
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {SharedService} from "../../../../../shared/shared.service";
import {AccommodationModificationStatus} from "../../model/accommodation-modification-status";

@Component({
  selector: 'app-accommodation-modification-cards',
  templateUrl: './accommodation-modification-cards.component.html',
  styleUrls: ['./accommodation-modification-cards.component.css']
})
export class AccommodationModificationCardsComponent {
  @Input() accommodationModifications!: AccommodationModification[];
  showAllRequests: boolean = true;
  constructor(private sharedService: SharedService) {
    this.sharedService.showAllRequests$.subscribe((value) => {
      this.showAllRequests = value;
    });
  }

  protected readonly AccommodationModificationStatus = AccommodationModificationStatus;
}
