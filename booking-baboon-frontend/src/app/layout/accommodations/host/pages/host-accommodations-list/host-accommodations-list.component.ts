import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {AccommodationFilter} from "../../../search/models/accommodationFilter.model";
import {HostService} from "../../../../users/services/host.service";
import {AuthService} from "../../../../../infrastructure/auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Host} from "../../../../users/models/host.model";

@Component({
  selector: 'app-host-accommodations-list',
  templateUrl: './host-accommodations-list.component.html',
  styleUrls: ['./host-accommodations-list.component.css']
})
export class HostAccommodationsListComponent{


  constructor(private accommodationService:AccommodationService, private hostService:HostService, private authService:AuthService) {

  }


}
