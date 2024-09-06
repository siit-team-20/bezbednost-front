import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmComponent} from "./confirm/confirm.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog():Observable<boolean> {
    const dialogRef: MatDialogRef<ConfirmComponent> = this.dialog.open(ConfirmComponent);
    return dialogRef.afterClosed();
  }


}
