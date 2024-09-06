import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accommodation-available-period-page',
  templateUrl: './accommodation-available-period-page.component.html',
  styleUrls: ['./accommodation-available-period-page.component.css']
})
export class AccommodationAvailablePeriodPageComponent {

  public accommodationId!: number;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')
      if(id === null) return
      this.accommodationId = +id;

    });
  }

}

