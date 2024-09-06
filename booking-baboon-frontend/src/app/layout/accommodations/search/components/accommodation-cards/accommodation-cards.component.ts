import {Component, Input} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  @Input() accommodations!: Accommodation[];
  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {
  }

}
