import { Component } from '@angular/core';

import {AccommodationFilter} from "../../models/accommodationFilter.model";
import {BehaviorSubject} from "rxjs";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";


@Component({
  selector: 'app-accommodations-page',
  templateUrl: './accommodations-page.component.html',
  styleUrls: ['./accommodations-page.component.css']
})
export class AccommodationsPageComponent {
  accommodations!: Accommodation[];



  constructor(private accommodationService:AccommodationService) {}


  onSearchClicked(accommodationFilter: AccommodationFilter): void {
    this.accommodationService.search(accommodationFilter).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data;
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
