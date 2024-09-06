import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private snackMessage$ = new BehaviorSubject<string>("");
  newSnackMessage = this.snackMessage$.asObservable();

  private showAllRequestsSubject = new BehaviorSubject<boolean>(true);
  showAllRequests$ = this.showAllRequestsSubject.asObservable();

  setShowAllRequests(value: boolean) {
    this.showAllRequestsSubject.next(value);
  }

  constructor() {}

  public openSnack(message: string) {
    this.snackMessage$.next(message);

  }
}

