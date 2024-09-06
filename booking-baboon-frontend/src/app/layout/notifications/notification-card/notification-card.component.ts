import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../../../shared/notifications/models/notification.model";
import {Router} from "@angular/router";
import {NotificationsService} from "../../../shared/notifications/notifications.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit{
  @Input() public notification!: Notification;
  public createdOn!: String;

  constructor(private notificationService: NotificationsService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createdOn = new Date(this.notification.timeCreated).toDateString()
  }

  readNotification(): void {
    this.notificationService.readNotification(this.notification.id).subscribe({
      next: value => {
        window.location.reload()
        this.router.navigate(['notifications/'+this.authService.getId()])
      }
    })
  }
}
