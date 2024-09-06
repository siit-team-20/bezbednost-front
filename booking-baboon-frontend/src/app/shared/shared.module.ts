import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {MapDialogComponent} from "./map/map-dialog/map-dialog.component";
import {MapComponent} from "./map/map/map.component";
import {ConfirmComponent} from "./dialogs/confirm/confirm.component";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    SnackBarComponent,
    MapDialogComponent,
    MapComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    SnackBarComponent,
    MapDialogComponent,
    MapComponent,
    ConfirmComponent
  ]
})
export class SharedModule { }
