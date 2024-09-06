import {Component, Input, OnInit} from '@angular/core';
import {Host} from "../../models/host.model";
import {Accommodation} from "../../../accommodations/shared/models/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {HostService} from "../../services/host.service";

@Component({
  selector: 'app-host-profile-page',
  templateUrl: './host-profile-page.component.html',
  styleUrls: ['./host-profile-page.component.css']
})
export class HostProfilePageComponent implements OnInit{
  host!: Host;
  constructor(private route: ActivatedRoute, private hostService: HostService) {
  }
  ngOnInit(){
    this.route.params.subscribe((params) => {
      const id = +params['hostId'];

      this.hostService.getProfile(id).subscribe({
        next: (data: Host) => {
          this.host = data;
        },
        error: (_) => { console.log("Error!"); }
      });
    });
  }

}
