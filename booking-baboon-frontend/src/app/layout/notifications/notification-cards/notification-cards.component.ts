import {Component, Input} from '@angular/core';
import {Notification} from "../../../shared/notifications/models/notification.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {NotificationsService} from "../../../shared/notifications/notifications.service";

@Component({
  selector: 'app-notification-cards',
  templateUrl: './notification-cards.component.html',
  styleUrls: ['./notification-cards.component.css']
})
export class NotificationCardsComponent {
  @Input() public notifications!: Notification[];
  constructor(private notificationService:NotificationsService, private authService:AuthService) {

  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() : void{
    let id = this.authService.getId();
    if (id == undefined) return;
    this.notificationService.getAllByUser(id).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        console.log(data)
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
