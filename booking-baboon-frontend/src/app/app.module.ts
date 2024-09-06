import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import {AccommodationService} from "./layout/accommodations/shared/services/accommodation.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Interceptor} from "./infrastructure/auth/interceptor";
import {AuthModule} from "./infrastructure/auth/auth.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule
  ],
  providers: [AccommodationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
