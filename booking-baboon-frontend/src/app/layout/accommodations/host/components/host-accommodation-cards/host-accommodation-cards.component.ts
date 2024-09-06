import {Component, Input, OnInit} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {HostService} from "../../../../users/services/host.service";
import {AuthService} from "../../../../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-host-accommodation-cards',
  templateUrl: './host-accommodation-cards.component.html',
  styleUrls: ['./host-accommodation-cards.component.css']
})
export class HostAccommodationCardsComponent implements OnInit {
  accommodations!: Accommodation[];
  constructor(private accommodationService:AccommodationService, private hostService:HostService, private authService:AuthService) {

  }

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations() : void{
    let id = this.authService.getId();
    if (id == undefined) return;
    this.accommodationService.getAccommodationsByHost(id).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data;
        console.log(data)
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
