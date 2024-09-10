import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {User} from "../../users/models/user.model";
import {Login} from "../../../infrastructure/auth/model/login.model";
import {AuthResponse} from "../../../infrastructure/auth/model/auth-response.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {SocketService} from "../../../shared/notifications/socket.service";
import { KeycloakService } from '../../keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router, private socketService: SocketService, private keycloakService: KeycloakService) {}

  async ngOnInit() {
      await this.keycloakService.init();
      await this.keycloakService.login();
  }

}