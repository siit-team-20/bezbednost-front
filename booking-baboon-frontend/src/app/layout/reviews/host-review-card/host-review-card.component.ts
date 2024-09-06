import {Component, Input, OnInit} from '@angular/core';
import {HostReview} from "../model/host-review.model";
import {HostService} from "../../users/services/host.service";
import {HostReviewService} from "../services/host-review.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-host-review-card',
  templateUrl: './host-review-card.component.html',
  styleUrls: ['./host-review-card.component.css']
})
export class HostReviewCardComponent implements OnInit{


  @Input() public review!: HostReview;
  public hostEmail!: String;

  constructor(private hostService: HostService, private hostReviewService:HostReviewService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.review.reviewedHost?.id)
    this.hostService.get(this.review.reviewedHost?.id).subscribe({
      next: value => {
        if(value.email)
        this.hostEmail = value.email
      }
    })
  }


  deleteReview() {
    this.hostReviewService.remove(this.review.id).subscribe({
      next: value => {
        window.location.reload()
        this.router.navigate(['guest/'+this.review.reviewer+'/reviews'])
      }
    })
  }
}
