import { Component } from '@angular/core';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  constructor(private authService: AuthService, private router: Router) {
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
}
