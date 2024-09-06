import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {UserEditRequest} from "../models/userEditRequest";
import {NotificationType} from "../models/NotificationType.module";
import {Host} from "../models/host.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'users')
  }

  getUser(id: number | undefined): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id)
  }

  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/email/' + email)
  }

  getProfile(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/profile/' + userId)
  }

  update(user: UserEditRequest) {
    return this.httpClient.put<User>(environment.apiHost + 'users/update', user)
      .subscribe();
  }

  changePassword(id: number | undefined, currentPassword: string | undefined, newPassword: string | undefined) {
    const requestBody = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return this.httpClient.put<User>(environment.apiHost + 'users/' + id + '/change-password',requestBody)
  }

  toggleNotifications(userId: number, notificationType: NotificationType): Observable<Host> {
    return this.httpClient.put<Host>(environment.apiHost + 'users/' + userId + "/toggle-notifications/" + notificationType, {})
  }

  blockUser(userId: number): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + 'users/' + userId + '/block', {})
  }


  // add(user: User): Observable<User> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<User>(environment.apiHost + 'users', user)
  // }


  unblockUser(userId: number): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + 'users/' + userId + '/unblock', {})
  }
}
