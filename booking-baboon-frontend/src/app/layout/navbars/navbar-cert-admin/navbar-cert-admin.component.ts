import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-navbar-cert-admin',
  templateUrl: './navbar-cert-admin.component.html',
  styleUrls: ['./navbar-cert-admin.component.css']
})
export class NavbarCertAdminComponent {

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
      this.router.navigate(['profile/' + this.authService.getId()])

    }
  }

}
