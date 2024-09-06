import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {GuestService} from "../../users/services/guest.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Notification} from "../../../shared/notifications/models/notification.model";
import {NotificationsService} from "../../../shared/notifications/notifications.service";

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit{
  notifications!: Notification[];

  constructor(private notificationService: NotificationsService, private authService: AuthService) {
  }
  ngOnInit(): void {
    let id = this.authService.getId();
    if(id !== undefined)
    this.notificationService.getAllByUser(id).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
      }
    })

  }
}
