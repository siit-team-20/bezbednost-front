import { Injectable } from '@angular/core';
import {environment} from "../../env/env";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import {UserService} from "../../layout/users/services/user.service";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {NotificationsService} from "./notifications.service";
import {Notification} from "./models/notification.model";
import {BehaviorSubject} from "rxjs";
import {SharedService} from "../shared.service";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private serverUrl = environment.socketHost + 'notifications-socket';
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  unreadCount$ = new BehaviorSubject(0);
  unreadCountState = this.unreadCount$.asObservable();

  constructor(private authService: AuthService, private notificationsService: NotificationsService, private sharedService: SharedService) { }

  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      // that.openGlobalSocket();
      that.openSocket();
    }, function (error: Error) {
      console.error('Error during WebSocket connection:', error);
    });

  }

  // Funckija za pretplatu na topic /socket-publisher (definise se u configureMessageBroker() metodi)
  // Globalni socket se otvara prilikom inicijalizacije klijentske aplikacije
  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/notification-publisher", (notification: Notification) => {
        this.handleResult();
      });
    }
  }

  // Funkcija za pretplatu na topic /socket-publisher/user-id
  // CustomSocket se otvara kada korisnik unese svoj ID u polje 'fromId' u submit callback-u forme 'userForm'
  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/notification-publisher/" + this.authService.getId(), (notification: Notification) => {
        this.sharedService.openSnack("New notification!");
        this.handleResult();
      });
    }
  }

  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult() {
    const id = this.authService.getId()
    if(id !== undefined){
      this.notificationsService.getUnreadCountByUser(id).subscribe({
        next: (data: number) => {
          this.unreadCount$.next(data);
        }
      })
    }

  }
}
