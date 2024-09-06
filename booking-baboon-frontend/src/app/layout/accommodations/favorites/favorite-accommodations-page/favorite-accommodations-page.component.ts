import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../shared/models/accommodation.model";
import {GuestService} from "../../../users/services/guest.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-favorite-accommodations-page',
  templateUrl: './favorite-accommodations-page.component.html',
  styleUrls: ['./favorite-accommodations-page.component.css']
})
export class FavoriteAccommodationsPageComponent implements OnInit{
  accommodations!: Accommodation[];

  constructor(private guestService: GuestService, private authService: AuthService) {
  }
  ngOnInit(): void {

    this.guestService.getFavorites(this.authService.getId()).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data;
      }
    })

  }

}
