import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../../layout/accommodations/shared/models/accommodation.model";
import {environment} from "../../env/env";
import {Notification} from "./models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllByUser(userId: number): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(environment.apiHost + 'notifications/user/' + userId);
  }

  getUnreadCountByUser(userId: number): Observable<number>{
    return this.httpClient.get<number>(`${environment.apiHost}notifications/user/${userId}/unread-count`);
  }

  readNotification(notificationId: number): Observable<Notification>{
    return this.httpClient.put<Notification>(`${environment.apiHost}notifications/${notificationId}/read`, {});
  }

}
