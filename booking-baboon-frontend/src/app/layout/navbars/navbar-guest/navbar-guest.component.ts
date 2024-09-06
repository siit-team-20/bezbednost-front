import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Guest} from "../../users/models/guest.model";
import {User} from "../../users/models/user.model";
import {NotificationsService} from "../../../shared/notifications/notifications.service";
import {SocketService} from "../../../shared/notifications/socket.service";

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit{
  loggedUserId!: number | undefined;
  badge: string = "";
  constructor(private authService: AuthService, private router: Router, private socketService: SocketService, private notificationsService: NotificationsService) {
  }

  public ngOnInit() {
    this.loggedUserId = this.authService.getId();
    if(this.loggedUserId!==undefined){
      this.socketService.unreadCountState.subscribe({
        next: (data: number) => {
          this.badge = data.toString()
        }
      });
      this.notificationsService.getUnreadCountByUser(this.loggedUserId).subscribe({
        next: (data: number) => {
          this.badge = data.toString()
        }
      });
    }
  }

  openAccountPage(): void {
    const helper = new JwtHelperService();

    const userToken: string | null = localStorage.getItem('user');

    if (userToken != null) {
      const decodedToken = helper.decodeToken(userToken);
      // this.userService.getByEmail(decodedToken.sub).subscribe({
      //   next: (user: User) => {this.user = user;
      //     this.router.navigate(['profile/' + user.email])}
      // })
      this.router.navigate(['profile/' + this.authService.getId()])
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      }
    })
  }
}
